import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
        name: 'coverImage',
        type: 'upload',
        relationTo: 'media',
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
        name: 'date',
        type: 'date',
        timezone: true,
    },
  ],
}