/**
 * Reducing the image size for all images in a catalogue
 * response
 */

import produce from 'immer';

function getImageWidthFromUrl({ url }) {
  try {
    return parseInt(url.match(/\/@(\d+)\//)[1], 10);
  } catch {
    return 0;
  }
}

function getFormatFromUrl({ url }) {
  try {
    return url.match(/\.([^.]+)$/)[1];
  } catch {
    return null;
  }
}

export function reduceImageSizeInCatalogueResponse(catalogueResponse) {
  function handleLevel(item) {
    if (!item) {
      return;
    }

    // Is this an image?
    if (item.url && item.variants) {
      item._availableSizes = Array.from(
        new Set(item.variants.map(getImageWidthFromUrl))
      );
      item._availableFormats = Array.from(
        new Set(item.variants.map(getFormatFromUrl))
      );

      // Remove avif if it is bigger than webp
      if (
        item.variants.find(
          (v) => v.url.endsWith('.avif') && v.url.includes('/@100/')
        )?.size >
        item.variants.find(
          (v) => v.url.endsWith('.webp') && v.url.includes('/@100/')
        )?.size
      ) {
        item._availableFormats.splice(
          item._availableFormats.indexOf('avif'),
          1
        );
      }

      delete item.variants;
    } else {
      if (Array.isArray(item)) {
        item.forEach(handleLevel);
      } else if (typeof item === 'object') {
        Object.values(item).forEach(handleLevel);
      }
    }
  }

  return produce(catalogueResponse, handleLevel);
}
