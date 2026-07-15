import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../../utils/ogImage';

export const prerender = true;

export async function getStaticPaths() {
  const portfolioEntries = await getCollection('products', ({ data }) => {
    return data.draft !== true && data.inStock !== true;
  });

  return portfolioEntries.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props;

  const png = await generateOgImage({
    eyebrow: entry.data.category,
    title: entry.data.title,
    meta: `${entry.data.wood} • ${entry.data.year}`,
    image: entry.data.image,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
