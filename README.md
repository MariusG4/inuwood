# InuWood - Website Astro

Website modern și complet optimizat SEO pentru InuWood, atelier de tâmplărie artizanală din **Bacău, România**.

✨ **Construit cu arhitectură pe componente reutilizabile**
🚀 **Astro + Tailwind CSS**
🇷🇴 **100% în limba română**
⚡ **SEO perfect cu Schema.org**

## 🚀 Project Structure (Cu Componente!)

```
InuWood/
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── SEO/                    ← Componente SEO reutilizabile
│   │   │   ├── SEOHead.astro
│   │   │   ├── OrganizationSchema.astro
│   │   │   └── LocalBusinessSchema.astro
│   │   ├── UI/                     ← Componente UI reutilizabile
│   │   │   ├── Hero.astro
│   │   │   ├── SectionHeader.astro
│   │   │   ├── ProductCard.astro
│   │   │   ├── BlogCard.astro
│   │   │   └── CTASection.astro
│   │   ├── Navigation.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro            ← Layout cu SEOHead component
│   └── pages/
│       ├── index.astro             ← Folosește componente UI
│       ├── about.astro
│       ├── products.astro
│       ├── contact.astro
│       └── blog.astro
├── COMPONENTS.md                   ← Documentație componente (NOU!)
├── SEO.md
├── DEPLOYMENT.md
└── package.json
```

## 📄 Pagini

- **Pagina Principală** (`/`) - Hero, servicii, portofoliu (folosește Hero, SectionHeader, ProductCard)
- **Despre Noi** (`/about`) - Poveste, valori, CTA (folosește Hero, SectionHeader, CTASection)
- **Produse** (`/products`) - Portofoliu 6 produse (folosește ProductCard component)
- **Contact** (`/contact`) - Formular Netlify + info atelier (folosește Hero component)
- **Blog** (`/blog`) - 6 articole + newsletter (folosește BlogCard component)

## 🎯 Arhitectură pe Componente (NOU!)

### Componente SEO Reutilizabile
- ✅ **SEOHead.astro** - Meta tags (Title, OG, Twitter) pentru toate paginile
- ✅ **OrganizationSchema.astro** - Schema.org Organization (global)
- ✅ **LocalBusinessSchema.astro** - Schema.org LocalBusiness (reutilizabil)

### Componente UI Reutilizabile
- ✅ **Hero.astro** - Hero section (label, heading, description)
- ✅ **SectionHeader.astro** - Headers pentru secțiuni
- ✅ **ProductCard.astro** - Card produs cu Schema.org Product
- ✅ **BlogCard.astro** - Card blog cu Schema.org BlogPosting
- ✅ **CTASection.astro** - Call-to-action customizabil

**Vezi [COMPONENTS.md](./COMPONENTS.md) pentru documentație completă!**

## ✨ Caracteristici SEO

- ✅ **100% Optimizat pentru SEO** - Meta tags complete, Open Graph, Twitter Cards
- ✅ **Structured Data (Schema.org)** - Organization, LocalBusiness, Product, Blog schemas
- ✅ **Sitemap.xml** - Pentru indexare optimă
- ✅ **Robots.txt** - Configurare pentru motoare de căutare
- ✅ **URL-uri Canonice** - Previne duplicate content
- ✅ **Imagini Optimizate** - Lazy loading, alt text descriptiv
- ✅ **Conținut în Română** - Toate textele traduse și optimizate
- ✅ **SEO Local** - Optimizat pentru căutări Cluj-Napoca
- ✅ **Mobile-First** - Design responsive complet
- ✅ **Performanță Optimizată** - Core Web Vitals ready

Vezi [SEO.md](./SEO.md) pentru detalii complete despre optimizările SEO.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 🚀 Deployment to Netlify

This project is configured for deployment to Netlify:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Netlify](https://www.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git repository
5. Netlify will auto-detect the build settings from `netlify.toml`
6. Click "Deploy site"

The site will automatically rebuild and deploy when you push changes to your repository.

## 🎨 Caracteristici Design

- Paletă de culori caldă, cu tonuri pământii
- Font League Spartan pentru aspect editorial
- Animații smooth de reveal la scroll (Intersection Observer)
- Design responsive pentru toate dispozitivele
- Efecte hover și tranziții fluide
- Imagini grayscale cu culoare la hover

## 📦 Tehnologii

- [Astro](https://astro.build/) - Static Site Generator (v4.5)
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first (v3.4)
- [Iconify](https://iconify.design/) - Framework icoane
- [Netlify](https://www.netlify.com/) - Platform deployment cu Forms

## 🌍 SEO & Accesibilitate

- **HTML Semantic** - Header, nav, main, article, section
- **ARIA Labels** - Pentru screen readers
- **Alt Text** - Toate imaginile au descrieri în română
- **Structured Data** - JSON-LD pentru rich snippets
- **Meta Tags** - Complete pe toate paginile
- **Mobile-Friendly** - 100% responsive
- **Core Web Vitals** - Optimizat pentru performanță
