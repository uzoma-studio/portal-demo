import type { GlobalConfig } from 'payload'

export const ThemeSettings: GlobalConfig = {
  slug: 'themeSettings',
  fields: [
    {
      name: 'config',
      type: 'json',
    },
  ]
}