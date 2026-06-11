# Implementation Plan

## Goal
Implement critical to moderate improvements for accessibility, performance, SEO, and code quality based on synthesized findings from research and code inspection.

## Tasks
1. **Add Swup accessibility plugin**
   - File: `src/layouts/Layout.astro` (check where Swup is initialized)
   - Changes: Install `@swup/a11y-plugin` via `pnpm add -D @swup/a11y-plugin`, import and register it with Swup instance.
   - Acceptance: Plugin installed, Swup configured with a11y plugin, screen reader announcements work on page transitions.

2. **Audit and fix image alt attributes**
   - File: Global - search for `<img>` tags in `.astro` and `.md` files
   - Changes: Ensure every `<img>` has a meaningful `alt` attribute; add missing ones, improve vague ones.
   - Acceptance: No `<img>` tags missing alt text; alt text descriptive and not empty (unless decorative, then use `alt=""`).

3. **Evaluate and potentially replace Locomotive Scroll with CSS Scroll-Driven Animations**
   - File: `src/styles/global.css` and any JavaScript initializing Locomotive Scroll
   - Changes: If Locomotive Scroll is non-essential, remove it and implement scroll-linked effects with CSS Scroll-Driven Animations; if essential, optimize initialization and check for performance/accessibility issues.
   - Acceptance: No performance lag on high-resolution displays; scrolling accessible; equivalent visual effect maintained.

4. **Upgrade Tailwind CSS to v4**
   - File: `package.json`, `tailwind.config.mjs`, `postcss.config.mjs`
   - Changes: Update `tailwindcss` to `^4.0.0`, adjust config to Tailwind v4 format (content paths, etc.), update PostCSS if needed.
   - Acceptance: Build succeeds with Tailwind v4; CSS bundle size reduced; build time improved.

5. **Inline critical CSS and use system fonts**
   - File: `src/layouts/Layout.astro`, `src/styles/global.css`
   - Changes: Extract above-the-fold CSS and inline in `<head>`; replace web fonts with system font stack to eliminate FOMP and reduce CLS.
   - Acceptance: Lighthouse shows no render-blocking CSS; reduced Cumulative Layout Shift.

6. **Offload third-party scripts via Partytown**
   - File: `src/layouts/Layout.astro` (or specific pages with scripts)
   - Changes: Add Astro integration for Partytown, move Google Analytics and other third-party scripts to web workers.
   - Acceptance: Third-party scripts no longer block main thread; improved First Input Delay.

7. **Add ESLint and Prettier for code quality**
   - File: New `.eslintrc.cjs`, `.prettierrc`, update `package.json` scripts
   - Changes: Install ESLint, Prettier, `eslint-plugin-astro`, `eslint-plugin-tailwindcss`, `astro-eslint-parser`; configure; add `lint` and `format` scripts.
   - Acceptance: Linting and formatting run without errors; code follows consistent style.

8. **Clean up duplicate lockfiles and check for unused dependencies**
   - File: `package-lock.json` (remove if using pnpm), `package.json`
   - Changes: Remove `package-lock.json` if pnpm is primary; run `pnpm ls` to find unused dependencies; uninstall them.
   - Acceptance: Only one lockfile present (`pnpm-lock.yaml`); no unnecessary dependencies in `node_modules`.

9. **Ensure environment variables are handled via .env**
   - File: `.env.example`, create `.env` if missing, update any hardcoded values
   - Changes: Populate `.env` from `.env.example`; replace hardcoded values with `import.meta.env`; ensure `.env` is in `.gitignore`.
   - Acceptance: Build works with `.env`; no secrets in code; `.env.example` present.

10. **Implement automated SEO checks during build**
    - File: New `src/seo-check.ts` or update `astro.config.mjs` to integrate a validation step
    - Changes: Add a script that validates H1, meta descriptions, structured data on build; fail build if issues found.
    - Acceptance: Build fails if SEO issues detected; ensures ongoing compliance.

11. **Address Google Search Console TODO (from SUMMARY.md)**
    - File: `SUMMARY.md` (update after action) or `src/pages/index.astro` (add meta tag)
    - Changes: Add Google Search Console verification meta tag or upload HTML file to public/.
    - Acceptance: Verification successful in Google Search Console.

12. **Enhance accessibility: ARIA labels, color contrast, keyboard navigation**
    - File: Global - check interactive elements in `.astro` files
    - Changes: Ensure all interactive elements have accessible names; verify color contrast ratios meet WCAG AA; test keyboard navigation.
    - Acceptance: Manual and automated (axe) accessibility checks pass.

13. **Performance optimization: images, lazy loading, font loading**
    - File: `src/components/CloudinaryImage.astro`, `src/styles/global.css`
    - Changes: Ensure Cloudinary image transformations include width, height, and appropriate breakpoints; verify lazy loading; check font-display strategy.
    - Acceptance: Lighthouse performance score improved; no layout shift from images; fonts load efficiently.

14. **Code maintenance: JSDoc/TypeScript for component props, remove duplication**
    - File: Global - review `.astro` components
    - Changes: Add JSDoc comments or TypeScript interfaces for component props where missing; abstract duplicated markup into reusable components.
    - Acceptance: Components have clear prop definitions; reduced duplication; easier maintenance.

15. **Development experience: pre-commit hooks, automated accessibility testing, document component usage**
    - File: New `.husky/`, update `package.json`, update `COMPONENTS.md`
    - Changes: Add husky for pre-commit linting and formatting; add axe-core to dev dependencies and test script; update COMPONENTS.md with usage examples.
    - Acceptance: Pre-commit hooks run; accessibility tests pass; documentation updated.

## Files to Modify
- `package.json` (multiple times)
- `tailwind.config.mjs`
- `postcss.config.mjs`
- `src/layouts/Layout.astro`
- `src/styles/global.css`
- `.eslintrc.cjs` (new)
- `.prettierrc` (new)
- `SUMMARY.md`
- `.env` (new or updated)
- `astro.config.mjs` (for SEO integration or Partytown)
- Various `.astro` and `.md` files for alt text, ARIA, etc.
- `src/components/CloudinaryImage.astro`
- `COMPONENTS.md`

## New Files
- `.eslintrc.cjs`
- `.prettierrc`
- `.env` (if not present)
- `src/seo-check.ts` (or similar)
- `.husky/` (with pre-commit hooks)
- Possibly a new SEO validation Astro integration

## Dependencies
- Task 1 (Swup a11y) can be done early.
- Task 2 (alt text) is independent.
- Task 3 (Locomotive Scroll) may affect design; coordinate with design review.
- Task 4 (Tailwind v4) may affect Tasks 5 and 6 (critical CSS, Partytown) as config changes.
- Task 5 (critical CSS) depends on finalized CSS after Tailwind upgrade.
- Task 6 (Partytown) requires identifying third-party scripts.
- Task 7 (ESLint/Prettier) must run before code is considered ready.
- Task 8 (lockfiles) should be done early to avoid confusion.
- Task 9 (env vars) should be done early to avoid leaks.
- Task 10 (SEO checks) can be added after basic SEO is in place.
- Task 11 (Search Console) depends on having a deployed site.
- Task 12 (accessibility enhancements) may rely on Task 1 and 3.
- Task 13 (performance) may benefit from Task 4 and 5.
- Task 14 (code maintenance) is ongoing.
- Task 15 (dev experience) can be done at any time but best after code is stable.

## Risks
- Swup a11y plugin may require additional markup or configuration; test with screen readers.
- Removing Locomotive Scroll may break design effects; ensure CSS alternatives provide similar UX.
- Tailwind v4 upgrade may break custom CSS or require config changes; run visual regression tests.
- Inlining critical CSS incorrectly could cause FOUC or missing styles; validate with Lighthouse.
- Partytown setup may break third-party scripts if not configured correctly; test analytics.
- ESLint/Prettier may flag existing code as errors; need to fix or adjust rules.
- Removing lockfiles could cause version mismatches; ensure pnpm lock is up-to-date.
- SEO validation might be too strict; tune rules to avoid false positives.
- Adding Search Console verification requires access to Google account; coordinate with owner.
- Managing .env: ensure .env is in .gitignore and not committed.
- Accessibility fixes may require design changes (e.g., color contrast).
- Image optimization may require re-uploading to Cloudinary or adjusting transformations.

## Supervisor coordination
No immediate blockers; proceed with plan execution.