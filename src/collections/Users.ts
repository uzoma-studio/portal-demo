import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
      defaultValue: ({ req }) => req?.user?.email?.split('@')[0] || 'user',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'spaces',
      type: 'relationship',
      relationTo: 'spaces',
      hasMany: true,
      admin: {
        description: 'Spaces this user is a member of',
      },
    },
    {
      name: 'lastVisitedSpace',
      type: 'text',
      required: false,
      admin: {
        description: 'The last space the user visited'
      }
    },
  ],
}
