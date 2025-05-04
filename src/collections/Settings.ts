import type { CollectionConfig } from 'payload'

export const SiteSettings: CollectionConfig = {
  slug: 'siteSettings',
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
        name: 'siteUrl',
        type: 'text',
        unique: true
    },
    // TODO: add background img and alt properties to be set dynamically from Payload
  ]
}