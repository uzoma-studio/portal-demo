import { CollectionConfig } from 'payload';

export const ChatMessages: CollectionConfig = {
  slug: 'chat-messages',
  admin: {
    useAsTitle: 'message',
    group: 'Chat',
  },
  fields: [
    {
      name: 'user',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'timestamp',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'space',
      type: 'relationship',
      relationTo: 'spaces',
      required: true,
      hasMany: false,
      index: true,
    },
  ],
};

export default ChatMessages;