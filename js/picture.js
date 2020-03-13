'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // Возвращает готовый для вставки DOM-элемент - фото, с заполненными данными
  function getCompletedPhoto(photoData) {
    var photo = photoTemplate.cloneNode(true);

    photo.querySelector('.picture__img').src = photoData.url;
    photo.querySelector('.picture__comments').textContent = photoData.comments.length;
    photo.querySelector('.picture__likes').textContent = photoData.likes;

    return photo;
  }

  var fragment = document.createDocumentFragment();

  // Выводит на экран фотографии из массива
  function renderPhotos(photos) {
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(getCompletedPhoto(photos[i]));
    }
  }

  // Обработчик успешной загрузки фотографий
  function onPhotosLoadSuccess(photos) {
    renderPhotos(photos);

    var picturesList = document.querySelector('.pictures');
    picturesList.appendChild(fragment);
  }

  // Обработчик неуспешной загрузки фотографий
  function onPhotosLoadError(errorMessage) {
    window.util.renderError(errorMessage);
  }

  window.backend.loadPhoto(onPhotosLoadSuccess, onPhotosLoadError);
})();
