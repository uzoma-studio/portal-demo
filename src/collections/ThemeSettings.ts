import type { CollectionConfig } from 'payload'

// TODO: This should be a GlobalConfig but using this causes the Vercel build to fail
// Update: I figured out that this was bc I didn't have migrations set up to the Production db.
export const ThemeSettings: CollectionConfig = {
  slug: 'themeSettings',
  fields: [
    {
      name: 'config',
      type: 'json',
    },
  ]
}