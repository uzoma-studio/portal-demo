import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres';
import { sql } from '@payloadcms/db-postgres';

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.execute(sql`
    ALTER TABLE "pages"
    ADD COLUMN IF NOT EXISTS "theme_config_position_x" numeric,
    ADD COLUMN IF NOT EXISTS "theme_config_position_y" numeric,
    ADD COLUMN IF NOT EXISTS "theme_config_icon" uuid,
    ADD COLUMN IF NOT EXISTS "theme_config_hotspot_name" text;
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.execute(sql`
    ALTER TABLE "pages"
    DROP COLUMN IF EXISTS "theme_config_position_x",
    DROP COLUMN IF EXISTS "theme_config_position_y",
    DROP COLUMN IF EXISTS "theme_config_icon",
    DROP COLUMN IF EXISTS "theme_config_hotspot_name";
  `);
} 