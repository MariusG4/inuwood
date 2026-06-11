# Research: Recent Issues, Best Practices, and Potential Improvements for Astro, Tailwind, Swup, and Locomotive Scroll

## Summary
The InuWood project uses a modern tech stack (Astro, Tailwind CSS, Swup, Locomotive Scroll) that generally aligns with current web best practices. However, research reveals specific opportunities to improve performance, accessibility, SEO, and maintainability. Critical issues include potential accessibility gaps with Swup and Locomotive Scroll, performance risks from unoptimized Tailwind configuration, and SEO considerations for client-side navigation. Modern alternatives like CSS Scroll-Driven Animations and Tailwind v4 offer significant improvements.

## Findings

1. **Astro Performance & SEO Foundations are Strong but Requires Tuning** — Astro’s static HTML output provides excellent baseline performance and SEO, but third-party scripts (like Google Analytics) can severely impact performance if not offloaded via Partytown. Inlining critical CSS and using system fonts eliminate render-blocking resources and layout shifts. [Source](https://jsonld.com/perfect-lighthouse-100-scores/) [Source](https://crawlix.app/blog/astro-seo-audit/)

2. **Tailwind CSS v4 Offers Major Performance Gains** — The project likely uses Tailwind CSS v3 (based on dependencies). Upgrading to Tailwind v4 provides up to 10x faster builds via its Rust-based engine, CSS-first configuration, and automatic purging. Proper content configuration is essential to avoid oversized CSS files. [Source](https://tailwindcss.com/blog/tailwindcss-v4) [Source](https://eastondev.com/blog/en/posts/dev/20260330-tailwind-performance-optimization/)

3. **Swup Requires Accessibility Plugin for Screen Reader Support** — Swup’s page transitions can break screen reader announcements and focus management. The official `@swup/a11y-plugin` automatically announces page titles and restores focus, mitigating these issues without markup changes. [Source](https://swup.js.org/plugins/a11y-plugin/) [Source](https://swup.js.org/getting-started/common-issues/)

4. **Locomotive Scroll Has Known Performance and Accessibility Concerns** — Locomotive Scroll v4+5 can cause scrolling lag on high-resolution displays and may interfere with native accessibility features like find-in-page (Ctrl/Cmd+F). Modern CSS Scroll-Driven Animations offer a performant, accessible alternative with no JavaScript required. [Source](https://github.com/locomotivemtl/locomotive-scroll/issues/555) [Source](https://webperfclinic.com/article/css-scroll-driven-animations-performance-guide/)

5. **Opportunity to Adopt CSS Scroll-Driven Animations** — For scroll-linked effects (parallax, progress bars), CSS Scroll-Driven Animations (supported in modern browsers) move work to the compositor thread, improving performance and accessibility compared to JavaScript-based solutions like Locomotive Scroll. [Source](https://webperfclinic.com/article/css-scroll-driven-animations-performance-guide/) [Source](https://engineered.at/articles/scroll-driven-css-in-2026-building-carousels-without-javascript/)

6. **Astro SEO Best Practices Need Verification** — While Astro is inherently SEO-friendly, audits commonly find missing H1 tags, duplicate meta descriptions, and incomplete structured data. Implementing automated checks during build (via Astro integrations or CI) ensures ongoing compliance. [Source](https://joost.blog/astro-seo-complete-guide/) [Source](https://wumty.com/blog/complete-astro-seo-checklist-2026/)

## Sources
- Kept: Perfect Lighthouse 100s on Astro: Performance, A11y, Best Practices, SEO (https://jsonld.com/perfect-lighthouse-100-scores/) — Demonstrates actionable performance and accessibility tactics achievable with Astro.
- Kept: Auditing an Astro Site in 2026: The 5 Issues We Find on Almost Every Codebase (https://crawlix.app/blog/astro-seo-audit/) — Highlights recurring Astro-specific pitfalls in real-world projects.
- Kept: Tailwind CSS v4.0 - Tailwind CSS (https://tailwindcss.com/blog/tailwindcss-v4) — Authoritative source on v4’s performance and architectural improvements.
- Kept: Tailwind Performance Optimization: JIT, Content Configuration, and Production Bundle Size Control (https://eastondev.com/blog/en/posts/dev/20260330-tailwind-performance-optimization/) — Practical guide to avoiding common Tailwind bloat issues.
- Kept: Accessibility Plugin — swup (https://swup.js.org/plugins/a11y-plugin/) — Directly addresses Swup’s accessibility shortcomings.
- Kept: Performance degradation with locomotive scroll on high-resolution displays (https://github.com/locomotivemtl/locomotive-scroll/issues/555) — Documents a critical performance issue affecting user experience.
- Kept: CSS Scroll-Driven Animations Guide (2026) | Web Perf Clinic (https://webperfclinic.com/article/css-scroll-driven-animations-performance-guide/) — Presents a modern, performant alternative to Locomotive Scroll.
- Kept: Astro SEO: the definitive guide. · Joost.blog (https://joost.blog/astro-seo-complete-guide/) — Comprehensive checklist for Astro-specific SEO validation.
- Kept: Astro SEO Checklist 2026 | 25 Steps | Wumty (https://wumty.com/blog/complete-astro-seo-checklist-2026/) — Actionable steps to maintain SEO health in Astro projects.
- Dropped: 2025 year in review | Astro (https://astro.build/blog/year-in-review-2025/) — Informative but less actionable for immediate improvements.
- Dropped: Tailwind CSS v4 Best Practices Guide (2024-2025) (https://combray.prose.sh/2025-11-30-tailwind-best-practices.) — Overlaps with v4 announcement and optimization guides; less critical.
- Dropped: Locomotive Scroll — Detection of elements in viewport & smooth scrolling with parallax effects (https://scroll.locomotive.ca/) — Marketing overview; lacks depth on concerns.
- Dropped: Common Issues & Troubleshooting — swup (https://swup.js.org/getting-started/common-issues/) — Superseded by the accessibility plugin solution for this context.

## Gaps
- **Bundle Analysis**: No direct measurement of current JavaScript/CSS bundle sizes or third-party impact. Running a Lighthouse CI audit would quantify performance gaps.
- **Accessibility Testing**: Manual WCAG audit not conducted; automated axe scanning could uncover hidden issues (e.g., color contrast, ARIA usage).
- **Tailwind Version**: Exact version in use not verified from lockfile; upgrade effort estimation requires checking current config.
- **Locomotive Scroll Usage**: Scope of usage not audited; determining if effects can be replaced with CSS alternatives requires template review.
- **SEO Validation**: No confirmation of structured data, meta tags, or heading hierarchy across all pages.

## Supervisor coordination
No immediate blockers; proceeding with research completion.