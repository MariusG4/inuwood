# Next Steps for InuWood Improvements

Based on the completed critical improvements, here are the recommended next steps ordered by priority:

## 🔴 High Priority (Start These Next)

### 1. **Upgrade Tailwind CSS to v4**
- **Why**: Up to 10x faster builds via Rust-based engine, CSS-first configuration, automatic purging
- **Actions**:
  - Update `package.json`: `"tailwindcss": "^4.0.0"`
  - Update `tailwind.config.mjs` to Tailwind v4 format (content paths, etc.)
  - Remove `postcss.config.mjs` if not needed (Tailwind v4 handles CSS internally)
  - Run build to verify success

### 2. **Inline Critical CSS & Use System Fonts**
- **Why**: Eliminate render-blocking resources, reduce CLS, prevent FOMP
- **Actions**:
  - Extract above-the-fold CSS from `global.css` and inline in `<head>` of `Layout.astro`
  - Replace Google Fonts (League Spartan) with system font stack to eliminate FOMP
  - Example system font: `font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
  - Use `critical` CSS tools or manual extraction for above-the-fold styles

### 3. **Offload Third-Party Scripts via Partytown**
- **Why**: Prevent main thread blocking, improve FID (First Input Delay)
- **Actions**:
  - Install `@astrojs/partytown`: `pnpm add -D @astrojs/partytown`
  - Add to `astro.config.mjs` integrations
  - Move Google Analytics, CookieYes, and other third-party scripts to web workers
  - Update `Layout.astro` to use Partytown patterns

### 4. **Add ESLint and Prettier for Code Quality**
- **Why**: Consistent code style, catch errors early
- **Actions**:
  - Install: `pnpm add -D eslint prettier eslint-plugin-astro eslint-plugin-tailwindcss astro-eslint-parser`
  - Create `.eslintrc.cjs` and `.prettierrc` config files
  - Add `"lint"` and `"format"` scripts to `package.json`
  - Run `pnpm lint` to fix existing issues

### 5. **Clean Up Duplicate Lockfiles**
- **Why**: Avoid confusion, ensure consistent dependencies
- **Actions**:
  - Remove `package-lock.json` (since using pnpm)
  - Verify `pnpm-lock.yaml` is up-to-date: `pnpm update --latest`
  - Run `pnpm ls` to check for unused dependencies

### 6. **Ensure Environment Variables Are Handled via .env**
- **Why**: Security, flexibility, avoid hardcoded values
- **Actions**:
  - Replace hardcoded WhatsApp number in `WhatsAppButton.astro` with `import.meta.env.PUBLIC_WHATSAPP_NUMBER`
  - Replace hardcoded message similarly
  - Update `.env.example` with placeholder values
  - Create `.env` from `.env.example` (ensure it's in `.gitignore`)
  - Update any other hardcoded values found during audit

### 7. **Address Google Search Console Verification**
- **Why**: Proper indexing and monitoring in Google Search
- **Actions**:
  - Add Google Search Console verification meta tag to `Layout.astro` Head
  - OR upload verification HTML file to `public/`
  - Update `SUMMARY.md` to mark this TODO as complete

### 8. **Implement Automated SEO Checks During Build**
- **Why**: Ensure ongoing SEO compliance
- **Actions**:
  - Create `src/seo-check.ts` or integrate into `astro.config.mjs`
  - Script should validate: H1 presence, meta descriptions, structured data
  - Fail build if issues found
  - Consider using existing Astro SEO integrations

## 🟡 Medium Priority (Address After High Priority)

### 9. **Performance Optimization: Images, Lazy Loading, Fonts**
- Verify Cloudinary transformations include appropriate breakpoints
- Confirm lazy loading is working for below-the-fold images
- Check font-display strategy (current: `display=swap` is good)

### 10. **Accessibility Enhancements: ARIA Labels, Color Contrast, Keyboard Navigation**
- Verify all interactive elements have accessible names
- Test color contrast ratios (WCAG AA)
- Test keyboard navigation throughout site
- Consider running automated axe scanning

## 🔵 Low Priority (Address When Possible)

### 11. **Code Maintenance: JSDoc/TypeScript for Props, Remove Duplication**
- Add JSDoc comments or TypeScript interfaces for component props
- Abstract duplicated markup into reusable components

### 12. **Development Experience: Pre-commit Hooks, Automated Testing, Document Components**
- Add husky for pre-commit linting/formatting
- Add axe-core to dev dependencies and test script
- Update `COMPONENTS.md` with usage examples

## Immediate Next Action
Start with **Tailwind CSS v4 upgrade** as it provides significant performance benefits with relatively straightforward implementation.

Run: `pnpm add -D tailwindcss@^4.0.0` and then update your config files accordingly.