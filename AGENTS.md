# Repository Guidelines

# Project Instructions

## Generate Commit Message

-  Use Korean
-  Follow Conventional Commits format (feat, fix, chore, etc.)

## Project Structure & Module Organization

The App Router lives in `app/`, with `layout.tsx` defining global chrome and route segments such as `page.tsx`, `about/`, `contact/`, and the password-gated `admin/`. Shared UI belongs in `components/`; shadcn primitives sit under `components/ui`. Data helpers reside in `lib/` (`supabase.ts`, `utils.ts`), while the custom design system is layered through `styles/abstracts`, `styles/base`, and `styles/components`, all wired by `styles/main.scss`. Static assets go in `public/`, and `out/` is produced by the static export flow.

## Build, Test, and Development Commands

Run `npm install` on first setup. Use `npm run dev` for the local server at `http://localhost:3000`, which also watches SCSS. Ship-ready bundles come from `npm run build`, and you can verify them with `npm run start`. Enforce lint rules and type safety with `npm run lint`. Generate additional shadcn components via `npx shadcn-ui@latest add card` (swap `card` for the needed primitive).

## Coding Style & Naming Conventions

Code in TypeScript with strictmode enabled; prefer function components and descriptive JSX structure. Indent JSX and TS code with two spaces and keep Tailwind utilities inline for layout or spacing tweaks. Reach for SCSS when creating reusable patterns—add new partials under `styles/components/_<name>.scss` and import them in `styles/main.scss`. Use the `@/*` path alias for intra-project imports, and keep SCSS class names descriptive (`btn-primary`, `heading-1`).

## Testing Guidelines

The repo currently lacks automated tests, so run `npm run lint` before every PR and manually smoke-test the Home, Contact (including Supabase submission flow), and Admin password gate. When adding tests, follow a `*.test.ts(x)` naming pattern alongside the code under test and include coverage for critical form handling.

## Commit & Pull Request Guidelines

Match the existing history’s imperative, sentence-cased subject lines (e.g., `Add Sass support and enhance footer with marquee feature`). Draft PRs with a summary, linked issues, and deployment or Supabase notes. Attach screenshots or recordings for visual updates, confirm `npm run lint` passes, and call out any environment variable changes.

## Environment & Security Notes

Keep secrets in `.env.local`; populate `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_ADMIN_PASSWORD` before local testing. Never commit `.env.local` or Supabase service keys. For production static exports, ensure `npm run build` completes and upload the regenerated `out/` directory to Cafe24.
