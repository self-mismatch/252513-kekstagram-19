'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // Возвращает готовый для вставки DOM-элемент - фото, с заполненными данными
  function renderPhoto(photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    return photoElement;
  }

  var fragment = document.createDocumentFragment();

  // Выводит на экран фотографии из массива
  function renderPhotoElements() {
    for (var i = 0; i < window.data.photos.length; i++) {
      fragment.appendChild(renderPhoto(window.data.photos[i]));
    }
  }

  renderPhotoElements();

  var picturesList = document.querySelector('.pictures');
  picturesList.appendChild(fragment);
})();
