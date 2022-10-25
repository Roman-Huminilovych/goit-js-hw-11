import renderGalleryMarkup from './renderMarkup';
import { galleryElContainer } from './refs';
import { lightbox } from './lightbox';

export default function appendImagesMarkup(data) {
  galleryElContainer.insertAdjacentHTML(
    'beforeend',
    renderGalleryMarkup(data.hits)
  );

  lightbox.refresh();
}
