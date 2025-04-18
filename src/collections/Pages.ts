import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
        name: 'body',
        type: 'richText',
        editor: lexicalEditor()
    },
    {
        name: 'slug',
        type: 'text',
    },
    {
        name: 'contentType',
        type: 'select',
        options: [
            { label: 'Blog', value: 'blog' },
            { label: 'Files', value: 'files' },
            { label: 'Chatbot', value: 'chatbot' },
            { label: 'Chat', value: 'chat-messages' },
            { label: 'Shop', value: 'products' },
        ],
    },
    {
      name: 'chatbot',
      type: 'relationship',
      relationTo: 'chatbot',
      admin: {
        condition: (_, { contentType }) => contentType === 'chatbot',
      },
    },
    {
        name: 'coverImage',
        type: 'upload',
        relationTo: 'media',
    }
  ],
}