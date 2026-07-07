# Context Builder 🧩 - Updated Project Context

## Architecture Summary
- **Framework**: Astro 6.4.4 (Static Site Generation)
- **Styling**: Tailwind CSS 4.3.0 (CSS-first engine)
- **State Management**: Zero-JS where possible; Swup for client-side navigation.
- **Content Strategy**: Markdown-based content collections with Zod validation.

## Critical Code Hubs
1. **`src/layouts/Layout.astro`**:
    - Manages the IntersectionObserver for scroll-reveal animations.
    - Initializes Swup with accessibility and head persistence.
    - Handles conditional loading of third-party scripts (GTM, Turnstile).
2. **`src/components/CloudinaryImage.astro`**:
    - Centralizes image optimization via Cloudinary.
    - Includes a fallback mechanism for local development.
3. **`src/styles/global.css`**:
    - Standardizes the brand palette and editorial typography.
    - Currently contains a legacy import for `locomotive-scroll`.

## Refactoring Targets
- **Dependency Pruning**: Remove `locomotive-scroll` (vestigial).
- **Theme Migration**: Move legacy `tailwind.config.mjs` into CSS-native `@theme`.
- **Environment Safety**: Replace hardcoded SEO tags with `import.meta.env`.