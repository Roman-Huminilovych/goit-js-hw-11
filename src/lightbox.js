import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export let lightbox = new SimpleLightbox('div.gallery a', {
  enableKeyboard: true,
  maxZoom: 4,
  overlayOpacity: 0.85,
  captionsData: 'alt',
  disableRightClick: true,
  alertError: false,
});
