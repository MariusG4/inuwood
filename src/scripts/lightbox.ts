import 'photoswipe/style.css';

let lightbox: import('photoswipe/lightbox').default | null = null;

/**
 * Initializes (or re-initializes) the PhotoSwipe lightbox for every gallery
 * found on the current page. Safe to call repeatedly (e.g. after Swup page
 * transitions) since it destroys any previous instance first.
 */
export const initLightbox = async () => {
  const galleries = document.querySelectorAll<HTMLElement>('[data-lightbox-gallery]');

  lightbox?.destroy();
  lightbox = null;

  if (!galleries.length) {
    return;
  }

  const { default: PhotoSwipeLightbox } = await import('photoswipe/lightbox');

  lightbox = new PhotoSwipeLightbox({
    gallery: '[data-lightbox-gallery]',
    children: 'a[data-lightbox-item]',
    pswpModule: () => import('photoswipe'),
    showHideAnimationType: 'zoom',
    bgOpacity: 0.92,
    padding: { top: 24, bottom: 24, left: 24, right: 24 },
  });

  lightbox.init();
};
