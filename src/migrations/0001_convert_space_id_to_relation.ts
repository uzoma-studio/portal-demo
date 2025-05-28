import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // First, get all pages
  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
  })

  // For each page, update the space field with the corresponding space ID
  for (const page of pages.docs) {
    if (page.spaceId) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: {
          space: page.spaceId,
        },
      })
    }
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Get all pages
  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
  })

  // For each page, convert the space relationship back to spaceId text
  for (const page of pages.docs) {
    if (page.space) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: {
          spaceId: page.space.id,
        },
      })
    }
  }
} 