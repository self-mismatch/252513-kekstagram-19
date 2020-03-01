'use strict';

(function () {
  var photosBlock = document.querySelector('.pictures');
  var photosList = photosBlock.querySelectorAll('.picture');

  var openedPhoto = document.querySelector('.big-picture');
  var openedPhotoCancel = openedPhoto.querySelector('.big-picture__cancel');
  var openedPhotoImg = openedPhoto.querySelector('.big-picture__img img');

  var openedPhotoSocial = openedPhoto.querySelector('.big-picture__social');
  var openedPhotoCaption = openedPhotoSocial.querySelector('.social__caption');
  var openedPhotoLikes = openedPhotoSocial.querySelector('.likes-count');
  var openedPhotoComments = openedPhotoSocial.querySelector('.social__comments');

  var commentTemplate = openedPhotoComments.querySelector('.social__comment');

  // Возвращает комментарий с параметрами, заданными в передающемся элементе массива с фотографиями
  function createComment(photo, index) {
    var comment = commentTemplate.cloneNode(true);

    var picture = comment.querySelector('.social__picture');
    var commentContent = comment.querySelector('.social__text');

    picture.src = photo.comments[index].avatar;
    picture.alt = photo.comments[index].name;
    commentContent.textContent = photo.comments[index].message;

    return comment;
  }

  // Обработчик события клика/нажатия Enter на миниатюру
  function onPhotoClick(evt) {

    if (evt.target.classList.contains('picture__img') || evt.target.classList.contains('picture')) {
      evt.preventDefault();
      openPhoto(evt.target);
    }
  }

  // Закрывает увеличенное изображение
  function closePhoto() {
    openedPhoto.classList.add('hidden');

    openedPhotoCancel.removeEventListener('click', onPhotoCancelClick);
    document.removeEventListener('keydown', onOpenedPhotoEscapePress);

    document.addEventListener('click', onPhotoClick);
  }

  // Обработчик нажатия на кнопку закрытия увеличенного изображения
  function onPhotoCancelClick() {
    closePhoto();
  }

  // Обработчик нажатия на "Escape" при открытом увеличенном изображении
  function onOpenedPhotoEscapePress(evt) {
    window.util.isEscEvent(evt, closePhoto);
  }

  // Показывает увеличенное фото
  function openPhoto(photo) {
    var currentPhoto;

    if (photo.classList.contains('picture__img')) {
      currentPhoto = photo;
    } else if (photo.classList.contains('picture')) {
      currentPhoto = photo.querySelector('.picture__img');
    }

    var imageSrc = currentPhoto.src;
    openedPhotoImg.src = imageSrc;

    openedPhoto.classList.remove('hidden');

    for (var i = 0; i < photosList.length; i++) {

      if (photosList[i] === currentPhoto.parentElement) {
        openedPhotoCaption.textContent = window.photos[i].description;
        openedPhotoLikes.textContent = window.photos[i].likes;

        openedPhotoComments.innerHTML = '';

        var fragment = document.createDocumentFragment();

        for (var j = 0; j < window.photos[i].comments.length; j++) {
          fragment.appendChild(createComment(window.photos[i], j));
        }

        openedPhotoComments.appendChild(fragment);
      }
    }

    openedPhotoCancel.addEventListener('click', onPhotoCancelClick);
    document.addEventListener('keydown', onOpenedPhotoEscapePress);

    document.removeEventListener('click', onPhotoClick);
  }

  document.addEventListener('click', onPhotoClick);
})();
