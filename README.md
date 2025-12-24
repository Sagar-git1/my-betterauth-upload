# 🚀 Next.js 15 Auth + Uploads Starter

A **production-ready full-stack starter** built with modern tooling:

- **Next.js 15 (App Router)**
- **Better Auth**
- **Drizzle ORM**
- **Neon Postgres**
- **Cloudflare R2**
- **shadcn/ui**
- **Vercel-ready**

This project demonstrates **secure authentication**, **protected routes**, and **authenticated file uploads** with clean architecture and reasonable git history.

---

## ✨ Features

- 🔐 Email & password authentication (signup / login / logout)
- 🍪 Secure session cookies (Better Auth)
- 🧠 Server Actions (no client-side auth hacks)
- 🔒 Middleware-protected routes
- 🗄️ Drizzle ORM with Neon Postgres
- ☁️ File uploads to Cloudflare R2
- 🎨 Modern UI using shadcn/ui
- ⏳ Loading states for auth actions
- 🚀 Ready for Vercel deployment

---

## 📁 Project Structure

src/
├── app/
│ ├── (auth)/
│ │ ├── login/
│ │ ├── signup/
│ │ └── logout/
│ ├── api/
│ │ ├── auth/[...all]/ # Better Auth handlers
│ │ └── upload/ # Cloudflare R2 upload API
│ ├── dashboard/ # Protected page
│ ├── upload/ # Upload UI
│ └── page.tsx # Homepage
├── components/
│ ├── navbar.tsx
│ ├── form-submit.tsx
│ └── ui/ # shadcn components
├── db/
│ ├── schema.ts
│ └── auth-schema.ts
├── lib/
│ ├── auth.ts
│ ├── db.ts
│ └── r2.ts
└── middleware.ts

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
# Database (Neon)
DATABASE_URL=postgresql://...

# Better Auth
BETTER_AUTH_SECRET=your-secure-secret
BETTER_AUTH_URL=http://localhost:3000

# Cloudflare R2
R2_ACCOUNT_ID=xxxx
R2_ACCESS_KEY_ID=xxxx
R2_SECRET_ACCESS_KEY=xxxx
R2_BUCKET_NAME=your-bucket
R2_PUBLIC_URL=https://your-public-r2-url (optional)
```

pnpm dev
pnpm drizzle:studio
pnpm drizzle:migrate
pnpm drizzle:generate
