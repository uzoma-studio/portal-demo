import type { CollectionConfig } from 'payload'

export const NewsTicker: CollectionConfig = {
  slug: 'newsTicker',
  labels: {
    singular: 'News Ticker',
    plural: 'News Ticker', // Keeps it singular even in lists
  },
  access: {
    create: ({ req }) => {
      // Only allow creating if there are no existing entries
      return req.payload.find({
        collection: 'newsTicker',
        limit: 1,
      }).then(({ totalDocs }) => totalDocs === 0);
    },
  },
  fields: [
    {
        name: 'tickerItems',
        type: 'blocks',
        blocks: [
          {
            slug: 'tickerItem',
            fields: [
              {
                name: 'text',
                type: 'text',
                required: true,
              },
              {
                name: 'link',
                type: 'text',
              },
            ],
          },
        ],
      },
      {
        name: 'space',
        type: 'relationship',
        relationTo: 'spaces',
        required: true,
        hasMany: false,
        index: true,
        admin: {
          description: 'Select the space this news ticker belongs to',
        },
      },
  ],
}