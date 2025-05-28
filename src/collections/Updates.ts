import type { CollectionConfig } from 'payload'

export const Updates: CollectionConfig = {
  slug: 'updates',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        description: 'Posts in this update',
      },
    },
  ],
} 