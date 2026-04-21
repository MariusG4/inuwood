# Wood & Grain - Astro Website

A beautiful, modern website for Wood & Grain woodworking company built with Astro and Tailwind CSS.

## 🚀 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navigation.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── products.astro
│       ├── contact.astro
│       └── blog.astro
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 📄 Pages

- **Landing Page** (`/`) - Hero section with featured services and portfolio preview
- **About Us** (`/about`) - Company story, values, and philosophy
- **Products** (`/products`) - Portfolio of handcrafted furniture pieces
- **Contact** (`/contact`) - Contact form and workshop information
- **Blog** (`/blog`) - Articles on woodworking techniques and insights

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

## 🎨 Design Features

- Custom color palette with warm, earthy tones
- League Spartan font for editorial feel
- Smooth reveal animations on scroll
- Responsive design for all devices
- Hover effects and transitions throughout
- Grayscale images with color on hover

## 📦 Technologies

- [Astro](https://astro.build/) - Static Site Generator
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Iconify](https://iconify.design/) - Icon framework
- [Netlify](https://www.netlify.com/) - Deployment platform
