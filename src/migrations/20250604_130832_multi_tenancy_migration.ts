import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_space_memberships_role" AS ENUM('member', 'admin', 'owner');
  CREATE TYPE "public"."enum_space_memberships_status" AS ENUM('active', 'pending', 'suspended');
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"updates_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "updates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "updates_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"product_images_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"spaces_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "spaces" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"domain" varchar NOT NULL,
  	"settings_site_title" varchar,
  	"settings_site_description" varchar,
  	"settings_background_image_id" integer,
  	"settings_theme" jsonb DEFAULT '{"style":{"menu":{"defaultHeight":"3.5rem","backgroundColor":"#ecf0f1"},"bodyFont":"Courier New","headerFont":"Helvetica","pageStyles":{"width":"50%","height":"70vh","borderColor":"purple","borderWidth":"3px","displayStyle":"center-modal","backgroundColor":"#fff"},"accentColor":"purple","displayMode":"icons","hotspotSize":"15","hotspotColor":"purple","primaryColor":"#9333ea","bodyTextColor":"#222","backgroundMode":"color","secondaryColor":"#c084fc","backgroundColor":"#fff","headerFontColor":"#222","contentTextColor":"#222"}}'::jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "space_memberships" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"space_id" integer NOT NULL,
  	"role" "enum_space_memberships_role" DEFAULT 'member' NOT NULL,
  	"joined_at" timestamp(3) with time zone NOT NULL,
  	"status" "enum_space_memberships_status" DEFAULT 'active' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "icons_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "icons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "product_images" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"product_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "theme_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "theme_settings" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_cover_image_id_media_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_product_image_id_media_id_fk";
  
   DROP INDEX IF EXISTS "pages_cover_image_idx";
  DROP INDEX IF EXISTS "products_product_image_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_theme_settings_id_idx";
  ALTER TABLE "pages" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "space_id" integer NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "theme_config_position_x" numeric NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "theme_config_position_y" numeric NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "theme_config_icon_id" integer;
  ALTER TABLE "pages" ADD COLUMN "theme_config_hotspot_name" varchar;
  ALTER TABLE "posts" ADD COLUMN "update_id" integer NOT NULL;
  ALTER TABLE "chatbot" ADD COLUMN "space_id" varchar NOT NULL;
  ALTER TABLE "chat_messages" ADD COLUMN "space_id" integer NOT NULL;
  ALTER TABLE "products" ADD COLUMN "space_id" integer NOT NULL;
  ALTER TABLE "subscriptions" ADD COLUMN "space_id" varchar NOT NULL;
  ALTER TABLE "users" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "users" ADD COLUMN "last_visited_space" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "updates_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "spaces_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "space_memberships_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "icons_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_images_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_updates_fk" FOREIGN KEY ("updates_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "updates_rels" ADD CONSTRAINT "updates_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "updates_rels" ADD CONSTRAINT "updates_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_images_fk" FOREIGN KEY ("product_images_id") REFERENCES "public"."product_images"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_spaces_fk" FOREIGN KEY ("spaces_id") REFERENCES "public"."spaces"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spaces" ADD CONSTRAINT "spaces_settings_background_image_id_media_id_fk" FOREIGN KEY ("settings_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "space_memberships" ADD CONSTRAINT "space_memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "space_memberships" ADD CONSTRAINT "space_memberships_space_id_spaces_id_fk" FOREIGN KEY ("space_id") REFERENCES "public"."spaces"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "icons_tags" ADD CONSTRAINT "icons_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."icons"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_updates_id_idx" ON "pages_rels" USING btree ("updates_id");
  CREATE INDEX IF NOT EXISTS "updates_updated_at_idx" ON "updates" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "updates_created_at_idx" ON "updates" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "updates_rels_order_idx" ON "updates_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "updates_rels_parent_idx" ON "updates_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "updates_rels_path_idx" ON "updates_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "updates_rels_posts_id_idx" ON "updates_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "products_rels_product_images_id_idx" ON "products_rels" USING btree ("product_images_id");
  CREATE INDEX IF NOT EXISTS "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "users_rels_spaces_id_idx" ON "users_rels" USING btree ("spaces_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "spaces_domain_idx" ON "spaces" USING btree ("domain");
  CREATE INDEX IF NOT EXISTS "spaces_settings_settings_background_image_idx" ON "spaces" USING btree ("settings_background_image_id");
  CREATE INDEX IF NOT EXISTS "spaces_updated_at_idx" ON "spaces" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "spaces_created_at_idx" ON "spaces" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "space_memberships_user_idx" ON "space_memberships" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "space_memberships_space_idx" ON "space_memberships" USING btree ("space_id");
  CREATE INDEX IF NOT EXISTS "space_memberships_updated_at_idx" ON "space_memberships" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "space_memberships_created_at_idx" ON "space_memberships" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "user_space_idx" ON "space_memberships" USING btree ("user_id","space_id");
  CREATE INDEX IF NOT EXISTS "icons_tags_order_idx" ON "icons_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "icons_tags_parent_id_idx" ON "icons_tags" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "icons_updated_at_idx" ON "icons" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "icons_created_at_idx" ON "icons" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "icons_filename_idx" ON "icons" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "icons_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "icons" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "product_images_product_idx" ON "product_images" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "product_images_updated_at_idx" ON "product_images" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "product_images_created_at_idx" ON "product_images" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "product_images_filename_idx" ON "product_images" USING btree ("filename");
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_space_id_spaces_id_fk" FOREIGN KEY ("space_id") REFERENCES "public"."spaces"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_theme_config_icon_id_icons_id_fk" FOREIGN KEY ("theme_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_update_id_updates_id_fk" FOREIGN KEY ("update_id") REFERENCES "public"."updates"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_space_id_spaces_id_fk" FOREIGN KEY ("space_id") REFERENCES "public"."spaces"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_space_id_spaces_id_fk" FOREIGN KEY ("space_id") REFERENCES "public"."spaces"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_updates_fk" FOREIGN KEY ("updates_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_spaces_fk" FOREIGN KEY ("spaces_id") REFERENCES "public"."spaces"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_space_memberships_fk" FOREIGN KEY ("space_memberships_id") REFERENCES "public"."space_memberships"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_icons_fk" FOREIGN KEY ("icons_id") REFERENCES "public"."icons"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_images_fk" FOREIGN KEY ("product_images_id") REFERENCES "public"."product_images"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_space_idx" ON "pages" USING btree ("space_id");
  CREATE INDEX IF NOT EXISTS "pages_theme_config_theme_config_icon_idx" ON "pages" USING btree ("theme_config_icon_id");
  CREATE INDEX IF NOT EXISTS "posts_update_idx" ON "posts" USING btree ("update_id");
  CREATE INDEX IF NOT EXISTS "chatbot_space_id_idx" ON "chatbot" USING btree ("space_id");
  CREATE INDEX IF NOT EXISTS "chat_messages_space_idx" ON "chat_messages" USING btree ("space_id");
  CREATE INDEX IF NOT EXISTS "products_space_idx" ON "products" USING btree ("space_id");
  CREATE INDEX IF NOT EXISTS "subscriptions_space_id_idx" ON "subscriptions" USING btree ("space_id");
  CREATE INDEX IF NOT EXISTS "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_updates_id_idx" ON "payload_locked_documents_rels" USING btree ("updates_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_spaces_id_idx" ON "payload_locked_documents_rels" USING btree ("spaces_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_space_memberships_id_idx" ON "payload_locked_documents_rels" USING btree ("space_memberships_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_icons_id_idx" ON "payload_locked_documents_rels" USING btree ("icons_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_product_images_id_idx" ON "payload_locked_documents_rels" USING btree ("product_images_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "cover_image_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "product_image_id";
  ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "site_title";
  ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "site_description";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "theme_settings_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "theme_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"config" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spaces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "space_memberships" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "icons_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_images" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "updates" CASCADE;
  DROP TABLE "updates_rels" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "spaces" CASCADE;
  DROP TABLE "space_memberships" CASCADE;
  DROP TABLE "icons_tags" CASCADE;
  DROP TABLE "icons" CASCADE;
  DROP TABLE "product_images" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_space_id_spaces_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_theme_config_icon_id_icons_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_update_id_updates_id_fk";
  
  ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_space_id_spaces_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_space_id_spaces_id_fk";
  
  ALTER TABLE "users" DROP CONSTRAINT "users_avatar_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_updates_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_spaces_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_space_memberships_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_icons_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_images_fk";
  
  DROP INDEX IF EXISTS "pages_slug_idx";
  DROP INDEX IF EXISTS "pages_space_idx";
  DROP INDEX IF EXISTS "pages_theme_config_theme_config_icon_idx";
  DROP INDEX IF EXISTS "posts_update_idx";
  DROP INDEX IF EXISTS "chatbot_space_id_idx";
  DROP INDEX IF EXISTS "chat_messages_space_idx";
  DROP INDEX IF EXISTS "products_space_idx";
  DROP INDEX IF EXISTS "subscriptions_space_id_idx";
  DROP INDEX IF EXISTS "users_avatar_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_updates_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_spaces_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_space_memberships_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_icons_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_product_images_id_idx";
  ALTER TABLE "pages" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "cover_image_id" integer;
  ALTER TABLE "products" ADD COLUMN "product_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "site_title" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "site_description" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "theme_settings_id" integer;
  CREATE INDEX IF NOT EXISTS "theme_settings_updated_at_idx" ON "theme_settings" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "theme_settings_created_at_idx" ON "theme_settings" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_product_image_id_media_id_fk" FOREIGN KEY ("product_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  
  CREATE INDEX IF NOT EXISTS "pages_cover_image_idx" ON "pages" USING btree ("cover_image_id");
  CREATE INDEX IF NOT EXISTS "products_product_image_idx" ON "products" USING btree ("product_image_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_theme_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("theme_settings_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "space_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "theme_config_position_x";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "theme_config_position_y";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "theme_config_icon_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "theme_config_hotspot_name";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "update_id";
  ALTER TABLE "chatbot" DROP COLUMN IF EXISTS "space_id";
  ALTER TABLE "chat_messages" DROP COLUMN IF EXISTS "space_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "space_id";
  ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "space_id";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "avatar_id";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "last_visited_space";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "updates_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "spaces_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "space_memberships_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "icons_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "product_images_id";
  DROP TYPE "public"."enum_space_memberships_role";
  DROP TYPE "public"."enum_space_memberships_status";`)
}
