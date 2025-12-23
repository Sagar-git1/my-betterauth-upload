import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import { env } from "@/lib/env";

export const auth = betterAuth({
  database: drizzleAdapter(db),

  secret: env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
  },

  session: {
    cookieCache: true,
  },
});
