// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { SiteSettings } from './collections/Settings'
import { Posts } from './collections/Posts'
import { NewsTicker } from './collections/NewsTicker'
import { Chatbot } from './collections/Chatbot'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    {
      ...Media,
      admin: {
        group: 'Content',
      },
    },
    {
      ...Pages,
      admin: {
        group: 'Content',
      },
    },
    {
      ...Posts,
      admin: {
        group: 'Content Types',
      },
    },
    {
      ...Chatbot,
      admin: {
        group: 'Content Types',
      },
    },
    {
      ...NewsTicker,
      admin: {
        group: 'Widgets'
      }
    },
    {
      ...Users,
      admin: {
        group: 'Users & Permissions',
      },
    },
    {
      ...SiteSettings,
      admin: {
        group: 'Settings',
      },
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
