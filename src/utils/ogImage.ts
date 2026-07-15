import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getFullImageUrl } from './cloudinaryUrl';

const WIDTH = 1200;
const HEIGHT = 630;

const FONTS_DIR = path.resolve(process.cwd(), 'src/assets/og-fonts');
const fontRegular = fs.readFileSync(path.join(FONTS_DIR, 'LeagueSpartan-400.ttf'));
const fontBold = fs.readFileSync(path.join(FONTS_DIR, 'LeagueSpartan-700.ttf'));
const fontBlack = fs.readFileSync(path.join(FONTS_DIR, 'LeagueSpartan-900.ttf'));

const COLORS = {
  primaryBg: '#F9F7F2',
  primaryText: '#2D2C2C',
  secondaryText: '#5D4037',
  accent: '#334B49',
};

interface OgImageOptions {
  eyebrow?: string;
  title: string;
  meta?: string;
  /** Raw `image` field coming from a content collection entry (Cloudinary id or local path). */
  image?: string;
}

/**
 * Resolves a content collection `image` field into a data URI so it can be
 * embedded directly into the generated SVG (Satori/Resvg run at build time
 * and can't rely on the browser to load remote images).
 */
async function resolveImageAsDataUri(image?: string): Promise<string | undefined> {
  if (!image) return undefined;

  const resolvedUrl = getFullImageUrl(image, { width: 800, height: 800, crop: 'fill' });

  try {
    if (resolvedUrl.startsWith('http://') || resolvedUrl.startsWith('https://')) {
      const response = await fetch(resolvedUrl);
      if (!response.ok) return undefined;
      const buffer = Buffer.from(await response.arrayBuffer());
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      return `data:${contentType};base64,${buffer.toString('base64')}`;
    }

    // Local path (e.g. /img/products/foo.webp) served from the `public/` folder.
    const localPath = path.resolve(process.cwd(), 'public', resolvedUrl.replace(/^\//, ''));
    const buffer = fs.readFileSync(localPath);
    const ext = path.extname(localPath).replace('.', '') || 'webp';
    const contentType = ext === 'jpg' ? 'jpeg' : ext;
    return `data:image/${contentType};base64,${buffer.toString('base64')}`;
  } catch {
    return undefined;
  }
}

/**
 * Generates a branded 1200x630 Open Graph PNG image for a blog post or a
 * product, embedding its title, category/meta line and featured photo.
 */
export async function generateOgImage({ eyebrow, title, meta, image }: OgImageOptions): Promise<Buffer> {
  const photoDataUri = await resolveImageAsDataUri(image);

  const markup = {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: COLORS.primaryBg,
        fontFamily: 'League Spartan',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: photoDataUri ? '58%' : '100%',
              height: '100%',
              padding: '80px',
            },
            children: [
              eyebrow
                ? {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        color: COLORS.accent,
                        fontSize: 28,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 6,
                        marginBottom: 28,
                      },
                      children: eyebrow,
                    },
                  }
                : null,
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    color: COLORS.primaryText,
                    fontSize: title.length > 40 ? 56 : 68,
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: -2,
                  },
                  children: title,
                },
              },
              meta
                ? {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        marginTop: 32,
                        color: COLORS.secondaryText,
                        fontSize: 26,
                        fontWeight: 400,
                      },
                      children: meta,
                    },
                  }
                : null,
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 'auto',
                    color: COLORS.primaryText,
                    fontSize: 30,
                    fontWeight: 900,
                    letterSpacing: 2,
                  },
                  children: 'InuWood',
                },
              },
            ].filter(Boolean),
          },
        },
        photoDataUri
          ? {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  width: '42%',
                  height: '100%',
                },
                children: [
                  {
                    type: 'img',
                    props: {
                      src: photoDataUri,
                      style: {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      },
                    },
                  },
                ],
              },
            }
          : null,
      ].filter(Boolean),
    },
  };

  const svg = await satori(markup as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: 'League Spartan', data: fontRegular, weight: 400, style: 'normal' },
      { name: 'League Spartan', data: fontBold, weight: 700, style: 'normal' },
      { name: 'League Spartan', data: fontBlack, weight: 900, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
  });
  return Buffer.from(resvg.render().asPng());
}
