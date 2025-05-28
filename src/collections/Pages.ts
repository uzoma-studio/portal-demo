import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
        name: 'body',
        type: 'richText',
        editor: lexicalEditor()
    },
    {
        name: 'slug',
        type: 'text',
        required: true,
        unique: true,
        admin: {
          position: 'sidebar',
        },
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
        admin: {
          description: 'Leave blank for default Page content type',
        },
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
      name: 'updates',
      type: 'relationship',
      relationTo: 'updates',
      hasMany: true,
      admin: {
        description: 'Updates for this blog page',
        condition: (_, { contentType }) => contentType === 'blog',
      },
    },
    {
      name: 'space',
      type: 'relationship',
      relationTo: 'spaces',
      required: true,
      hasMany: false,
      index: true,
      admin: {
        description: 'Select the space this page belongs to',
      },
    },
    {
      name: 'themeConfig',
      type: 'group',
      fields: [
        {
          name: 'position',
          type: 'group',
          fields: [
            {
              name: 'x',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
              admin: {
                description: 'X coordinate (0-100)',
              },
            },
            {
              name: 'y',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
              admin: {
                description: 'Y coordinate (0-100)',
              },
            },
          ],
        },
        {
          name: 'icon',
        type: 'upload',
          relationTo: 'icons',
          admin: {
            description: 'Optional icon image for the page',
          },
        },
        {
          name: 'hotspotName',
          type: 'text',
          admin: {
            description: 'Optional name to display on the hotspot',
          },
        },
  ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Only generate slug if title exists and it's a create operation or title is being updated
        if (data.title && (operation === 'create' || (req.body && 'title' in req.body))) {
          // Convert title to lowercase and replace spaces with hyphens
          let slug = data.title.toLowerCase().replace(/\s+/g, '-');
          
          // Remove special characters
          slug = slug.replace(/[^a-z0-9-]/g, '');
          
          // Remove consecutive hyphens
          slug = slug.replace(/-+/g, '-');
          
          // Remove leading and trailing hyphens
          slug = slug.replace(/^-+|-+$/g, '');
          
          // If it's an update operation, check if the slug already exists
          if (operation === 'update') {
            const existingPages = await req.payload.find({
              collection: 'pages',
              where: {
                slug: {
                  equals: slug,
                },
                id: {
                  not_equals: data.id,
                },
              },
            });
            
            // If slug exists, append a number
            if (existingPages.totalDocs > 0) {
              let counter = 1;
              let newSlug = `${slug}-${counter}`;
              
              while (true) {
                const checkSlug = await req.payload.find({
                  collection: 'pages',
                  where: {
                    slug: {
                      equals: newSlug,
                    },
                    id: {
                      not_equals: data.id,
                    },
                  },
                });
                
                if (checkSlug.totalDocs === 0) break;
                counter++;
                newSlug = `${slug}-${counter}`;
              }
              
              slug = newSlug;
            }
          }
          
          data.slug = slug;
        }
        
        return data;
      },
    ],
  },
}