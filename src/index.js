import './css/styles.css';
import throttle from 'lodash.throttle';
import * as message from './showMessage';
import { fetchPictures } from './fetchPictures';
import { lightbox } from './lightbox';
import appendImagesMarkup from './appendMarkup';
import { formEl, galleryElContainer, inputEL, observerEl } from './refs';

formEl.addEventListener('submit', onFormSubmit);

let query = '';
let searchQuery = '';
let page = 0;
let totalPages = 0;
const perPage = 40;

function onFormSubmit(e) {
  e.preventDefault();
  searchPictures();
}

async function searchPictures() {
  const resetPage = () => (page = 1);
  const clearMarkup = () => (galleryElContainer.innerHTML = '');

  if (!inputEL.value.trim()) {
    message.onEmpty();
    return;
  }

  query = inputEL.value.trim();
  searchQuery = query;
  intersectionObserver.observe(observerEl);
  resetPage();
  clearMarkup();

  try {
    const res = await fetchPictures(searchQuery, page, perPage);
    const { totalHits, hits } = res;

    if (!hits.length) {
      message.onFetchError();
      return;
    }

    appendImagesMarkup(res);
    message.onSuccess(totalHits);
  } catch (error) {
    console.log(error);
  }
}

function makeScroll(entries) {
  const incrementPage = () => (page += 1);

  entries.forEach(entry => {
    if (entry.isIntersecting && entry.boundingClientRect.bottom > 300) {
      incrementPage();

      fetchPictures(searchQuery, page, perPage).then(images => {
        appendImagesMarkup(images);
        checkData(images, perPage, page);

        lightbox.refresh();
      });
    }
  });
}

function checkData(data, perPage, page) {
  totalPages = Math.ceil(data.total / perPage);

  if (page >= totalPages) {
    return message.onEndOfResults();
  }
}

const intersectionObserver = new IntersectionObserver(
  throttle(makeScroll, 500),
  {
    rootMargin: '150px',
  }
);
