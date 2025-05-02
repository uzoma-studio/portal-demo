import type { CollectionConfig } from 'payload'

// TODO: This should be a GlobalConfig but using this causes the Vercel build to fail
export const ThemeSettings: CollectionConfig = {
  slug: 'themeSettings',
  fields: [
    {
      name: 'config',
      type: 'json',
    },
  ]
}