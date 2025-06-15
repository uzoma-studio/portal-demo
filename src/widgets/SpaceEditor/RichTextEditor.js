import React, { useState } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import OnChangePlugin from './components/LexicalOnChangePlugin'
import styled from 'styled-components';

const StyledContentEditable = styled(ContentEditable)`
    min-height: 300px;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

function onError(error) {
    console.error(error);
}

const editorConfig = {
    namespace: 'PortalEditor',
    theme: {},
    onError
}

const RichTextEditor = ({ setPageBodyField, initialContent }) => {
    
    function onChange(editorState) {
        setPageBodyField(editorState);
    }

    return (
        <LexicalComposer initialConfig={{...editorConfig, editorState: JSON.stringify(initialContent)}}>
            <RichTextPlugin
                contentEditable={
                <StyledContentEditable
                    aria-placeholder={'Enter some text...'}
                />
                }
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <OnChangePlugin onChange={onChange} />
        </LexicalComposer>
    )
}

export default RichTextEditor