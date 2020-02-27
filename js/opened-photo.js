'use strict';

(function () {
  var photosBlock = document.querySelector('.pictures');
  var photosList = photosBlock.querySelectorAll('.picture');

  var openedPhoto = document.querySelector('.big-picture');
  var openedPhotoCancel = openedPhoto.querySelector('.big-picture__cancel')
  var openedPhotoImg = openedPhoto.querySelector('.big-picture__img img');

  var openedPhotoSocial = openedPhoto.querySelector('.big-picture__social');
  var openedPhotoCaption = openedPhotoSocial.querySelector('.social__caption');
  var openedPhotoLikes = openedPhotoSocial.querySelector('.likes-count');
  var openedPhotoComments = openedPhotoSocial.querySelector('.social__comments');

  function onPhotoClick(evt) {
    if (evt.target.classList.contains('picture__img') || evt.target.classList.contains('picture')) {
      evt.preventDefault();
      openPhoto(evt.target);
    }
  }

  function closePhoto() {
    openedPhoto.classList.add('hidden');

    openedPhotoCancel.removeEventListener('click', onPhotoCancelClick);
    document.removeEventListener('keydown', onOpenedPhotoEscapePress);

    document.addEventListener('click', onPhotoClick);
  }

  function onPhotoCancelClick() {
    closePhoto();
  }

  function onOpenedPhotoEscapePress(evt) {
    window.util.isEscEvent(evt, closePhoto);
  }

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
          fragment.appendChild(window.createComment(window.photos[i], j));
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
