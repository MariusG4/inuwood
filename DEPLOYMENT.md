# Deployment Guide - Wood & Grain Website

This guide will help you deploy your Astro website to Netlify.

## Prerequisites

- A Git repository (GitHub, GitLab, or Bitbucket account)
- A Netlify account (free tier available at https://www.netlify.com/)

## Step 1: Push Your Code to Git

If you haven't already, initialize a git repository and push your code:

```bash
git init
git add .
git commit -m "Initial commit - Wood & Grain website"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify UI (Recommended)

1. Log in to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Netlify to access your repositories
5. Select your repository
6. Netlify will auto-detect the build settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Click **"Deploy site"**

Your site will be live in a few minutes! Netlify will provide a random URL like `random-name-123456.netlify.app`.

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Log in to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Step 3: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure your DNS settings
4. Netlify will automatically provision an SSL certificate

## Step 4: Enable Automatic Deployments

Netlify automatically redeploys your site when you push changes to your Git repository:

```bash
# Make changes to your code
git add .
git commit -m "Update content"
git push
```

Netlify will detect the push and automatically rebuild and deploy your site.

## Environment Variables (If Needed)

If you need to add environment variables:

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add your key-value pairs

## Build Settings

The build settings are already configured in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Testing Locally Before Deploy

Always test your build locally before deploying:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build
npm run build
npm run preview
```

## Troubleshooting

### Build Fails on Netlify

- Check the build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Make sure Node version is compatible (Netlify uses Node 18 by default)

### Pages Not Loading

- Check that the `publish` directory is set to `dist`
- Verify the redirect rules in `netlify.toml`

### Need to Change Node Version

Create a `.nvmrc` file in your project root:

```
18
```

Or specify in `netlify.toml`:

```toml
[build.environment]
  NODE_VERSION = "18"
```

## Useful Netlify Features

- **Deploy Previews**: Every pull request gets a preview URL
- **Branch Deploys**: Deploy specific branches for testing
- **Form Handling**: Netlify can handle form submissions (update contact form to use Netlify Forms)
- **Analytics**: Enable Netlify Analytics for visitor insights
- **Functions**: Add serverless functions if needed

## Support

- Netlify Documentation: https://docs.netlify.com/
- Astro Documentation: https://docs.astro.build/
- Community Support: https://answers.netlify.com/

## Environment Variables

The site uses external services for images and newsletter subscriptions.
Copy `.env.example` to `.env` locally and set the same variables in
**Netlify → Site Settings → Environment Variables**.

### Cloudinary (Images)

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Upload your product / about / homepage images
3. Use the same **public ID** referenced in the code (e.g. `products/masa-lemn-1`)
4. Add these environment variables to Netlify:
   - `PUBLIC_CLOUDINARY_CLOUD_NAME` — your Cloudinary cloud name

Optional (only for signed uploads or the upload widget):
   - `PUBLIC_CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

When the cloud name is set, images are served via Cloudinary with
`f_auto` (format auto) and `q_auto` (quality auto) for optimal delivery.
When it is **not** set, the site falls back to local images in `public/img/`
so you can develop without a Cloudinary account.

### Brevo (Newsletter)

1. Create a free account at [brevo.com](https://brevo.com)
2. Create a contact list for newsletter subscribers
3. Generate an API v3 key
4. Add these environment variables to Netlify:
   - `BREVO_API_KEY` — your Brevo API key
   - `BREVO_LIST_ID` — numeric ID of the newsletter list (default: 3)
   - `BREVO_DOI_TEMPLATE_ID` — double opt-in template ID, or 0 for single opt-in
   - `BREVO_DOI_REDIRECT_URL` — optional redirect after DOI confirmation

When the API key is missing in a **dev** environment the function returns a
simulated success so the UI can be tested. In **production** the function
returns an error if the key is missing.

---

Your InuWood website is now ready to be deployed! 🚀
