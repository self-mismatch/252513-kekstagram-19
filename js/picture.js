'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var imgFilters = document.querySelector('.img-filters');

  // Возвращает готовый для вставки DOM-элемент - фото, с заполненными данными
  function getCompletedPhoto(photoData) {
    var photo = photoTemplate.cloneNode(true);

    photo.querySelector('.picture__img').src = photoData.url;
    photo.querySelector('.picture__comments').textContent = photoData.comments.length;
    photo.querySelector('.picture__likes').textContent = photoData.likes;

    return photo;
  }

  // Выводит на экран фотографии из массива
  function renderPhotos(photos) {
    var fragment = document.createDocumentFragment();
    var picturesList = document.querySelector('.pictures');

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(getCompletedPhoto(photos[i]));
    }

    picturesList.appendChild(fragment);
  }

  // Обработчик успешной загрузки фотографий
  function onPhotosLoadSuccess(photos) {
    renderPhotos(photos);

    imgFilters.classList.remove('img-filters--inactive');

    window.picture.pictures = photos.slice();
  }

  // Обработчик неуспешной загрузки фотографий
  function onPhotosLoadError(errorMessage) {
    window.util.renderError(errorMessage);
  }

  window.backend.loadPhoto(onPhotosLoadSuccess, onPhotosLoadError);

  window.picture = {
    renderPhotos: renderPhotos
  };
})();
