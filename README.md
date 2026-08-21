<div align="center">

# GEWA REALTY
### Premium Goa Real Estate Experience

<img src="https://raw.githubusercontent.com/satitech-official/gewa-reality-/main/public/images/hero-goa.jpg" alt="Gewa Realty website preview" width="100%" />

<br />

[![LIVE DEMO](https://img.shields.io/badge/%E2%96%B6%20LIVE%20DEMO-OPEN%20WEBSITE-1f3d34?style=for-the-badge&logo=github&logoColor=white)](https://satitech-official.github.io/gewa-reality-/)

[![Deploy Gewa Realty](https://github.com/satitech-official/gewa-reality-/actions/workflows/deploy.yml/badge.svg)](https://github.com/satitech-official/gewa-reality-/actions/workflows/deploy.yml)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-222222?style=flat-square&logo=github)

### [OPEN LIVE WEBSITE →](https://satitech-official.github.io/gewa-reality-/)

</div>

---

## About

Gewa Realty is a premium Goa real-estate discovery and advisory experience featuring curated residential and commercial properties, location guides, investment-focused content, rich property detail pages and polished motion-driven UI.

The repository also contains PostgreSQL/Drizzle-backed admin and API functionality. The GitHub Pages deployment publishes the public website as a static showcase using the bundled preview data, while the original backend/admin source remains available for a full server deployment.

## Highlights

- Premium responsive real-estate UI
- Animated luxury home experience
- Property discovery and category pages
- Villa, apartment, plot and commercial sections
- Detailed property pages with galleries and amenities
- Goa location explorer and location detail pages
- Investment and property advisory content
- Insights / property guides
- Compare, shortlist and map experiences
- Responsive navigation and polished layouts
- Bundled real property-style photography for preview

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- PostgreSQL + Drizzle ORM for full backend deployments

## Run Locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production Build

```bash
pnpm build
pnpm start
```

## Database

Database access is optional for the public preview. Without `DATABASE_URL`, public pages use bundled preview data. For a persistent production backend, configure the environment and run the Drizzle setup commands documented in the project.

## GitHub Pages

The public showcase is automatically built and deployed from the `main` branch using GitHub Actions.

**Live:** https://satitech-official.github.io/gewa-reality-/

> GitHub Pages hosts the public static showcase. Server APIs, database writes and the admin backend require a Node/Vercel-style server deployment.

## Images

Image credits and preview-image notes are available in `public/images/CREDITS.md`. Replace representative stock imagery with verified client-approved property photos before a production launch.
