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

  var isAllPhotoUploaded = false;

  // Сохраняет в глобальной области видимости загруженные фотографии с сервера
  function saveUploadedPhotos(photos) {
    if (!isAllPhotoUploaded) {
      window.picture.pictures = photos.slice();

      isAllPhotoUploaded = !isAllPhotoUploaded;
    }
  }

  // Выводит на экран фотографии
  function renderPhotos(photos) {
    var fragment = document.createDocumentFragment();
    var picturesList = document.querySelector('.pictures');

    photos.forEach(function (photo) {
      fragment.appendChild(getCompletedPhoto(photo));
    });

    picturesList.appendChild(fragment);

    saveUploadedPhotos(photos);
  }

  // Обработчик успешной загрузки фотографий
  function onPhotosLoadSuccess(photos) {
    renderPhotos(photos);

    imgFilters.classList.remove('img-filters--inactive');
  }

  // Обработчик неуспешной загрузки фотографий
  function onPhotosLoadError(errorMessage) {
    window.util.renderError(errorMessage);
  }

  window.backend.loadPhotos('', 'GET', onPhotosLoadSuccess, onPhotosLoadError);

  window.picture.renderPhotos = renderPhotos;
})();
