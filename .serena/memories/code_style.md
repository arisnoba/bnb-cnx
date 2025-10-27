# Code Style & Conventions
- Use TypeScript with `strict` mode; rely on Next.js App Router conventions (async server components where appropriate, default exports for route components).
- JSX indentation: 2 spaces, prefer semantic HTML with Tailwind utility classes; section comments use `{/* ... */}` for readability.
- Share UI via `components/` and shadcn/ui primitives; extend design tokens through SCSS partials under `styles/` when Tailwind utilities are insufficient.
- Follow Tailwind naming plus SCSS BEM-like utilities (`btn-primary`, `heading-1`); register new SCSS partials in `styles/main.scss`.
- Keep helper logic inside `lib/utils.ts`; use `@/*` alias when importing across directories.
- Run `npm run lint` before commits to satisfy Next.js/ESLint defaults.