import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "spaces" ALTER COLUMN "settings_theme" SET DEFAULT '{"style":{"menu":{"defaultHeight":"3.5rem","backgroundColor":"#ccc","showNewsTicker":true},"bodyFont":"Courier New","headerFont":"Courier New","pageStyles":{"width":"50%","height":"70vh","borderColor":"purple","borderWidth":"3px","displayStyle":"center-modal","backgroundColor":"#fff"},"accentColor":"purple","displayMode":"icons","hotspotSize":"15","hotspotColor":"purple","primaryColor":"#9333ea","bodyTextColor":"#222","backgroundMode":"color","secondaryColor":"#c084fc","backgroundColor":"#fff","headerFontColor":"#222","contentTextColor":"#222","backgroundImageRenderMode":"center","environment":"park"}}'::jsonb;
  ALTER TABLE "news_ticker" ADD COLUMN "space_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "news_ticker" ADD CONSTRAINT "news_ticker_space_id_spaces_id_fk" FOREIGN KEY ("space_id") REFERENCES "public"."spaces"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "news_ticker_space_idx" ON "news_ticker" USING btree ("space_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "news_ticker" DROP CONSTRAINT "news_ticker_space_id_spaces_id_fk";
  
  DROP INDEX IF EXISTS "news_ticker_space_idx";
  ALTER TABLE "spaces" ALTER COLUMN "settings_theme" SET DEFAULT '{"style":{"menu":{"defaultHeight":"3.5rem","backgroundColor":"#ecf0f1"},"bodyFont":"Courier New","headerFont":"Helvetica","pageStyles":{"width":"50%","height":"70vh","borderColor":"purple","borderWidth":"3px","displayStyle":"center-modal","backgroundColor":"#fff"},"accentColor":"purple","displayMode":"icons","hotspotSize":"15","hotspotColor":"purple","primaryColor":"#9333ea","bodyTextColor":"#222","backgroundMode":"color","secondaryColor":"#c084fc","backgroundColor":"#fff","headerFontColor":"#222","contentTextColor":"#222"}}'::jsonb;
  ALTER TABLE "news_ticker" DROP COLUMN IF EXISTS "space_id";`)
}
