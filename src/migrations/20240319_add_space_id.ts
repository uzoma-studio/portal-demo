import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.execute(sql`
    -- Add spaceId to chatbot table
    ALTER TABLE "chatbot" ADD COLUMN "space_id" varchar NOT NULL;
    CREATE INDEX "chatbot_space_id_idx" ON "chatbot" ("space_id");

    -- Add spaceId to chat_messages table
    ALTER TABLE "chat_messages" ADD COLUMN "space_id" varchar NOT NULL;
    CREATE INDEX "chat_messages_space_id_idx" ON "chat_messages" ("space_id");

    -- Add spaceId to posts table
    ALTER TABLE "posts" ADD COLUMN "space_id" varchar NOT NULL;
    CREATE INDEX "posts_space_id_idx" ON "posts" ("space_id");

    -- Add spaceId to products table
    ALTER TABLE "products" ADD COLUMN "space_id" varchar NOT NULL;
    CREATE INDEX "products_space_id_idx" ON "products" ("space_id");

    -- Add spaceId to subscriptions table
    ALTER TABLE "subscriptions" ADD COLUMN "space_id" varchar NOT NULL;
    CREATE INDEX "subscriptions_space_id_idx" ON "subscriptions" ("space_id");
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.execute(sql`
    -- Remove spaceId from chatbot table
    DROP INDEX IF EXISTS "chatbot_space_id_idx";
    ALTER TABLE "chatbot" DROP COLUMN "space_id";

    -- Remove spaceId from chat_messages table
    DROP INDEX IF EXISTS "chat_messages_space_id_idx";
    ALTER TABLE "chat_messages" DROP COLUMN "space_id";

    -- Remove spaceId from posts table
    DROP INDEX IF EXISTS "posts_space_id_idx";
    ALTER TABLE "posts" DROP COLUMN "space_id";

    -- Remove spaceId from products table
    DROP INDEX IF EXISTS "products_space_id_idx";
    ALTER TABLE "products" DROP COLUMN "space_id";

    -- Remove spaceId from subscriptions table
    DROP INDEX IF EXISTS "subscriptions_space_id_idx";
    ALTER TABLE "subscriptions" DROP COLUMN "space_id";
  `)
} 