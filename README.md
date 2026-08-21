# Gewa Realty Premium Website — Fixed Preview

This version is prepared to run even when a PostgreSQL database has not been configured. When `DATABASE_URL` is absent, public pages and form APIs use bundled preview data instead of crashing. When a valid database URL is provided, the same routes use PostgreSQL through Drizzle.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production check

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Database (optional for preview)

Copy `.env.example` to `.env.local` and set `DATABASE_URL` for persistent data.

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

`db:seed` only creates an admin user when `ADMIN_EMAIL` and `ADMIN_PASSWORD` are supplied. No default production password is embedded in the project.

## Important fixes in this package

- Added every missing `/public/images/*` asset referenced by the UI and seed data.
- Replaced broken/missing image placeholders with locally stored real stock photography.
- Added image fallback handling on property cards and property detail galleries.
- Removed the hard crash caused by a missing `DATABASE_URL`.
- Added bundled preview data for properties, locations, insights, FAQs and public forms.
- Added preview-mode API fallbacks for properties, leads, site visits, seller submissions and analytics.
- Fixed the malformed `max-w-[1440*px]` Tailwind class.
- Replaced the hard-coded Drizzle database URL with an environment-based `drizzle.config.ts`.
- Converted the broken seed script to TypeScript and removed the duplicate object key.
- Removed the hard-coded default admin password from the seed flow.

## Images

See `public/images/CREDITS.md`. The bundled images are representative stock photography for the preview. Use verified, client-approved photos for actual property listings before production.
