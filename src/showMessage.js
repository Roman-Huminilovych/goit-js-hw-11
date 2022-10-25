import { Notify } from 'notiflix';
export { onFetchError, onEmpty, onSuccess, onEndOfResults };

Notify.init({
  position: 'center-bottom',
  distance: '20px',
  borderRadius: '14px',
  timeout: 3000,
  clickToClose: true,
  cssAnimationStyle: 'from-bottom',
});

function onFetchError() {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      position: 'right-top',
      fontSize: '12px',
    }
  );
}

const onSuccess = totalHits => {
  Notify.success(`Hooray! We found ${totalHits} images.`, {
    position: 'right-top',
    fontSize: '14px',
  });
};

const onEmpty = () =>
  Notify.info('If you want to see pictures, write something');

function onEndOfResults() {
  return Notify.info(
    `We're sorry, but you've reached the end of search results.`,
    {
      position: 'center-bottom',
      width: '420px',
    }
  );
}
