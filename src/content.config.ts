import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    category: z.string(),
    image: z.string(),
    readTime: z.string(),
    author: z.string().optional().default('InuWood'),
    draft: z.boolean().optional().default(false),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    wood: z.string(),
    year: z.string(),
    image: z.string(),
    alt: z.string(),
    excerpt: z.string(),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
        })
      )
      .optional()
      .default([]),
    price: z.string().optional(),
    dimensions: z.string().optional(),
    finish: z.string().optional(),
    featured: z.boolean().optional().default(false),
    inStock: z.boolean().optional().default(false),
    basePrice: z.string().optional(),
    options: z
      .array(
        z.object({
          label: z.string(),
          type: z.enum(['select', 'radio']).optional().default('select'),
          required: z.boolean().optional().default(true),
          values: z.array(
            z.object({
              value: z.string(),
              label: z.string(),
              priceModifier: z.string().optional(),
            })
          ),
        })
      )
      .optional()
      .default([]),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, products };
