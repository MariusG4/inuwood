# Quick Start Guide

Get your Wood & Grain website up and running in minutes!

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start the development server
npm run dev
```

Visit `http://localhost:4321` in your browser to see your site.

## Building for Production

```bash
# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

## Project Structure

```
InuWood/
├── src/
│   ├── components/
│   │   ├── Navigation.astro   # Main navigation bar
│   │   └── Footer.astro        # Footer component
│   ├── layouts/
│   │   └── Layout.astro        # Base layout wrapper
│   └── pages/
│       ├── index.astro         # Landing page
│       ├── about.astro         # About Us page
│       ├── products.astro      # Products portfolio
│       ├── contact.astro       # Contact form
│       └── blog.astro          # Blog listing
├── public/
│   └── favicon.svg             # Site icon
└── netlify.toml                # Netlify deployment config
```

## Pages Overview

### 🏠 Landing Page (`/`)
- Hero section with bold typography
- Services showcase
- Featured portfolio items

### 👥 About Us (`/about`)
- Company story
- Workshop image
- Core values
- Call-to-action

### 📦 Products (`/products`)
- Portfolio grid of furniture pieces
- Masonry-style layout
- Hover effects
- Project details

### 📧 Contact (`/contact`)
- Contact form
- Workshop address & hours
- Contact information
- Visit appointment notice

### 📝 Blog (`/blog`)
- Blog post cards
- Categories and read times
- Newsletter signup
- Article previews

## Customization

### Colors

Edit `tailwind.config.mjs` to change the color scheme:

```javascript
colors: {
  primary: {
    bg: '#F9F7F2',    // Cream background
    text: '#2D2C2C',   // Dark text
  },
  secondary: {
    bg: '#EFECE5',     // Light tan
    text: '#5D4037',   // Brown
  },
  accent: '#334B49',   // Dark green
}
```

### Content

- **Images**: Replace Unsplash URLs with your own images
- **Text**: Edit the content in each `.astro` file
- **Contact Info**: Update footer and contact page with your details

### Adding Blog Posts

Edit `src/pages/blog.astro` and add to the `blogPosts` array:

```javascript
{
  title: 'Your Blog Title',
  excerpt: 'Short description...',
  date: 'Month Day, Year',
  category: 'Category',
  image: 'https://your-image-url.jpg',
  readTime: 'X min read'
}
```

### Adding Products

Edit `src/pages/products.astro` and add to the `products` array:

```javascript
{
  title: 'Product Name',
  category: 'Category',
  wood: 'Wood Type',
  year: 'YYYY',
  image: 'https://your-image-url.jpg'
}
```

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions to Netlify.

Quick deploy:
```bash
# Push to Git
git add .
git commit -m "Your message"
git push

# Connect to Netlify and deploy
# (See DEPLOYMENT.md for detailed steps)
```

## Support

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

Happy building! 🚀
