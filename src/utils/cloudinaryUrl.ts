const LOCAL_EXTENSION_MAP: Record<string, string> = {
  'about-us/despre-noi': '.jpg',
};

export const isCloudinarySrc = (src: string): boolean => {
  const isExternalUrl = src.startsWith('http://') || src.startsWith('https://');
  const isLocalPath = src.startsWith('/') || src.startsWith('.');
  return !isExternalUrl && !isLocalPath;
};

/**
 * Builds a Cloudinary delivery URL, or falls back to the local `/img` path
 * when Cloudinary isn't configured (mirrors CloudinaryImage.astro's logic).
 */
export const getFullImageUrl = (
  src: string,
  {
    width,
    height,
    crop,
  }: { width?: number; height?: number; crop?: 'fill' | 'fit' } = {},
): string => {
  const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (isCloudinarySrc(src) && cloudName) {
    const transformations = [
      'f_auto',
      'q_auto',
      crop && width && height ? `c_${crop}` : undefined,
      crop === 'fill' ? 'g_auto' : undefined,
      width ? `w_${width}` : undefined,
      height ? `h_${height}` : undefined,
    ]
      .filter(Boolean)
      .join(',');
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${src}`;
  }

  if (isCloudinarySrc(src)) {
    const ext = LOCAL_EXTENSION_MAP[src] || '.webp';
    return `/img/${src}${ext}`;
  }

  return src;
};
