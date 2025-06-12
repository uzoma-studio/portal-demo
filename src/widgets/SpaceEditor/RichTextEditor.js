import React, { useState } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import OnChangePlugin from './components/LexicalOnChangePlugin'

function onError(error) {
    console.error(error);
}

const editorConfig = {
    namespace: 'PortalEditor',
    theme: {},
    onError
}

const RichTextEditor = ({ setPageBodyField }) => {
    
    function onChange(editorState) {
        setPageBodyField(editorState);
    }

    return (
        <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
            contentEditable={
            <ContentEditable
                aria-placeholder={'Enter some text...'}
                placeholder={<div>Enter some text...</div>}
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