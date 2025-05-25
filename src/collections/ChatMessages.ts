import { CollectionConfig } from 'payload';

export const ChatMessages: CollectionConfig = {
  slug: 'chat-messages',
  admin: {
    useAsTitle: 'message',
    group: 'Chat',
  },
  fields: [
    {
      name: 'spaceId',
      type: 'text',
      required: true,
      index: true,
    },
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
  ],
};

export default ChatMessages;