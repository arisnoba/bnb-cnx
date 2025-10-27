# Project Overview
- **Purpose**: Marketing website for BNB CNX with Home, About, Contact, and password-protected Admin dashboard to review Supabase contact submissions.
- **Tech Stack**: Next.js 14 (App Router) with TypeScript, Tailwind CSS plus shadcn/ui, custom SCSS layer, Supabase client, deployed to Vercel (preview) or Cafe24 (static export).
- **Structure**: `app/` contains routed pages and `layout.tsx`; `components/` holds shared UI pieces (Header, Footer, ContactForm) and shadcn-derived UI primitives; `lib/` wraps Supabase and utilities; `styles/` stores the SCSS system (abstracts/base/components) with `main.scss`; `public/` for assets.
- **Environment**: `.env.local` expects Supabase URL/anon key and `NEXT_PUBLIC_ADMIN_PASSWORD` for the admin route.
- **Notable tooling**: Path alias `@/*` via `tsconfig.json`; shadcn generator available via `npx shadcn-ui@latest add`.