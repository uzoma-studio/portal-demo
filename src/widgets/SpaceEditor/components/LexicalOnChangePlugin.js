import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";

const OnChangePlugin = ({ onChange }) => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener(({editorState}) => {
            // console.log('DATA', listener.editorState.toJSON())
            onChange(editorState.toJSON());
        });
        // TODO: Write a teardown return function here
    }, [editor, onChange]);

    return null;
}

export default OnChangePlugin;