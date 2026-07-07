# Implementation Plan 📅 - Final Cleanup & Optimization

## Goal
Complete the transition to Tailwind 4, finalize the removal of dead code, and optimize the remaining components for performance and maintainability.

## Tasks

### 1. Final Removal of Locomotive Scroll
- **Action**: Run `pnpm remove locomotive-scroll` and remove the CSS import in `src/styles/global.css`.
- **Status**: Pending (Logic was removed, but dependency persists).

### 2. Tailwind 4 Migration (Pure CSS)
- **Action**: Migrate configuration from `tailwind.config.mjs` to a `@theme` block in `src/styles/global.css`. Delete `tailwind.config.mjs` and `postcss.config.mjs`.
- **Status**: Pending (Currently using legacy compatibility mode).

### 3. SEO & Environment Variable Polish
- **Action**: Replace the hardcoded `VERIFICATION_CODE_HERE` in `Layout.astro` with an environment variable.
- **Status**: Pending.

### 4. Cloudinary Fallback Logic Improvement
- **Action**: Update `CloudinaryImage.astro` to handle local image extensions more dynamically rather than using a hardcoded mapping.
- **Status**: Pending.

### 5. Iconify Optimization
- **Action**: Evaluate moving decorative icons to `astro-icon` to reduce client-side JS dependency.
- **Status**: Ongoing.