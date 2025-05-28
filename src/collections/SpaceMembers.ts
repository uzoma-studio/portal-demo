import { CollectionConfig } from 'payload';

export const SpaceMemberships: CollectionConfig = {
  slug: 'spaceMemberships',
  admin: {
    useAsTitle: 'user',
    defaultColumns: ['user', 'space', 'role', 'joinedAt'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'space',
      type: 'relationship',
      relationTo: 'spaces',
      required: true,
      index: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Member', value: 'member' },
        { label: 'Admin', value: 'admin' },
        { label: 'Owner', value: 'owner' },
      ],
      defaultValue: 'member',
      required: true,
    },
    {
      name: 'joinedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
        { label: 'Suspended', value: 'suspended' },
      ],
      defaultValue: 'active',
      required: true,
    },
  ],
  indexes: [
    {
      fields: ['user', 'space'],
      unique: true,
    },
  ],
}; 