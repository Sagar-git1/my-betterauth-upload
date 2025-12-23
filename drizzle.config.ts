import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql", // Neon is Postgres-compatible
  schema: "./src/db/schema.ts", // Path to your schema definitions
  out: "./drizzle", // Folder for migrations
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Neon connection string from .env
  },
});
