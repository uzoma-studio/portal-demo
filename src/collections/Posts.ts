import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'update',
      type: 'relationship',
      relationTo: 'updates',
      required: true,
      hasMany: false,
      admin: {
        description: 'The update this post belongs to',
      },
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
        // TODO: auto-generate and ensure uniqueness for slugs
    },
    {
        name: 'date',
        type: 'date',
        timezone: true,
    },
  ],
}