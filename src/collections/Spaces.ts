import { CollectionConfig } from 'payload';
import themeSettings from '../../themeSettings.json';

export const Spaces: CollectionConfig = {
  slug: 'spaces',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'siteTitle',
          type: 'text',
        },
        {
          name: 'siteDescription',
          type: 'text',
        },
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
          name: 'theme',
          type: 'json',
          defaultValue: themeSettings
        }
      ]
    }
  ],
}; 