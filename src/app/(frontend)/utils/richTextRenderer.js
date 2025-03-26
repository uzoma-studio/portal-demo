// Rich Text Renderer: https://payloadcms.com/docs/rich-text/converting-jsx

import {RichText as RichTextConverter} from '@payloadcms/richtext-lexical/react'

const RichText = ({ data }) => {
    return <RichTextConverter data={data} />
}

export default RichText