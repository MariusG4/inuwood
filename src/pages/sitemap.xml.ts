import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const site = 'https://inuwood.ro';
const today = new Date().toISOString().split('T')[0];

function pageXml(loc: string, priority: number, changefreq: string) {
  return `  <url>\n    <loc>${site}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority.toFixed(1)}</priority>\n  </url>`;
}

export const GET: APIRoute = async () => {
  const blogPosts = await getCollection('blog', ({ data }) => data.draft !== true);
  const products = await getCollection('products', ({ data }) => data.draft !== true);

  const staticPages = [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/about', priority: 0.8, changefreq: 'monthly' },
    { loc: '/products', priority: 0.9, changefreq: 'weekly' },
    { loc: '/blog', priority: 0.8, changefreq: 'weekly' },
    { loc: '/contact', priority: 0.7, changefreq: 'monthly' },
  ];

  const blogUrls = blogPosts.map((post) => ({
    loc: `/blog/${post.id}`,
    priority: 0.7,
    changefreq: 'monthly',
  }));

  const productUrls = products.map((product) => ({
    loc: `/products/${product.id}`,
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const allUrls = [...staticPages, ...blogUrls, ...productUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((u) => pageXml(u.loc, u.priority, u.changefreq)).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
