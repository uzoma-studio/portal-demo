import type { CollectionConfig } from 'payload'

export const SiteSettings: CollectionConfig = {
  slug: 'siteSettings',
  fields: [
    {
        name: 'siteUrl',
        type: 'text',
        unique: true
    },
  ]
}