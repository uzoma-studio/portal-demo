import type { CollectionConfig } from 'payload';

export const Chatbot: CollectionConfig = {
  slug: 'chatbot',
  labels: {
    singular: 'Chatbot',
    plural: 'Chatbots',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'spaceId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
        name: 'avatar',
        type: 'upload',
        relationTo: 'media'
    },
    {
      name: 'nodes',
      type: 'json',
      required: true,
    },
  ],
};

export default Chatbot;