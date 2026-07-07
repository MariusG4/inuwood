# Project Scout 🛰️ - Updated Mapping

## Core Architecture
- **Framework**: Astro 6.4.4 (Static Output)
- **Styling**: Tailwind CSS 4.3.0 (Vite-integrated)
- **Transitions**: Swup 4.9.0 with A11y, Head, and Scripts plugins.
- **Optimization**: PartyTown for offloading GTM and CookieYes scripts.

## Key Components Mapping
- `src/layouts/Layout.astro`: Central layout handling SEO, fonts, and client-side orchestration (Reveal animations, Swup).
- `src/components/SEO/`: Specialized components for Schema.org (Organization, LocalBusiness).
- `src/components/UI/`: Reusable interface elements (ProductCard, BlogCard, Hero).
- `src/content/`: Data-driven content managed via `src/content.config.ts`.

## Observations
- **Build System**: The project uses pnpm with a workspace configuration for build optimization.
- **Environment**: Relies on `.env` for Cloudinary, WhatsApp, and GTM configuration.
- **Ghost Code**: `locomotive-scroll` remains in `package.json` and `global.css` despite being removed from the logic.