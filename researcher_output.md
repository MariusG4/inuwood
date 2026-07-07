# Researcher 🔍 - Tech Stack Audit

## Summary
The project is on the cutting edge of the Astro ecosystem. It successfully leverages **Tailwind CSS 4** and **Astro 6**, providing a highly performant and modern development experience. 

## Updated Findings

1. **Tailwind CSS 4 Adoption**: The project is already using Tailwind 4 via the `@tailwindcss/vite` plugin. However, it still relies on a legacy `tailwind.config.mjs`. Transitioning to a CSS-first `@theme` configuration would align better with Tailwind 4's architecture.
2. **Astro 6 Performance**: The site is well-optimized using Astro 6's static output. The inclusion of PartyTown correctly offloads heavy third-party scripts (CookieYes, GTM), significantly improving Core Web Vitals.
3. **Swup & Accessibility**: The project correctly uses `@swup/a11y-plugin`, resolving common SPA-like navigation issues with screen readers.
4. **Locomotive Scroll Removal**: Research confirms that removing Locomotive Scroll was the correct move for accessibility (native scroll search) and performance (avoiding JS-heavy scroll hijacking).
5. **SEO & Structured Data**: The use of JSON-LD for LocalBusiness and Organization schemas is a best practice for local SEO in the carpentry niche.

## Dead Code Alert
- `locomotive-scroll` (v5) is still present in `package.json` and `src/styles/global.css`.
- `dotenv` (v17) is redundant as Astro has built-in support for `.env` files.