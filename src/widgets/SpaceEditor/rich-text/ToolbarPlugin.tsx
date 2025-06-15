/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';

const StyledToolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-bottom: none;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  background: #f8f9fa;
`;

const StyledButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  background: white;
  cursor: pointer;
  font-size: 0.875rem;
  min-width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f0f0f0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background: #e9ecef;
    border-color: #ced4da;
  }
`;

const StyledDivider = styled.div`
  width: 1px;
  background: #ddd;
  margin: 0 0.25rem;
`;

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, updateToolbar]);

  return (
    <StyledToolbar>
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        disabled={!canUndo}
        title="Undo"
        type="button"
      >
        Undo
      </StyledButton>
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        disabled={!canRedo}
        title="Redo"
        type="button"
      >
        Redo
      </StyledButton>
      <StyledDivider />
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={isBold ? 'active' : ''}
        title="Bold"
        type="button"
      >
        B
      </StyledButton>
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={isItalic ? 'active' : ''}
        title="Italic"
        type="button"
      >
        I
      </StyledButton>
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={isUnderline ? 'active' : ''}
        title="Underline"
        type="button"
      >
        U
      </StyledButton>
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={isStrikethrough ? 'active' : ''}
        title="Strikethrough"
        type="button"
      >
        S
      </StyledButton>
      <StyledDivider />
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
        title="Align Left"
        type="button"
      >
        Left
      </StyledButton>
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
        title="Align Center"
        type="button"
      >
        Center
      </StyledButton>
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
        title="Align Right"
        type="button"
      >
        Right
      </StyledButton>
    </StyledToolbar>
  );
}
