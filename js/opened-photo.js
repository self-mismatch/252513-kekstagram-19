'use strict';

(function () {
  var openedPhoto = document.querySelector('.big-picture');
  var openedPhotoCancel = openedPhoto.querySelector('.big-picture__cancel');
  var openedPhotoImg = openedPhoto.querySelector('.big-picture__img img');

  var openedPhotoSocial = openedPhoto.querySelector('.big-picture__social');
  var openedPhotoCaption = openedPhotoSocial.querySelector('.social__caption');
  var openedPhotoLikes = openedPhotoSocial.querySelector('.likes-count');
  var openedPhotoComments = openedPhotoSocial.querySelector('.social__comments');

  var commentTemplate = openedPhotoComments.querySelector('.social__comment');

  // Возвращает комментарий с параметрами, заданными в передающемся элементе массива с фотографиями
  function getComment(photo, commentIndex) {
    var comment = commentTemplate.cloneNode(true);

    var picture = comment.querySelector('.social__picture');
    var commentContent = comment.querySelector('.social__text');

    picture.src = photo.comments[commentIndex].avatar;
    picture.alt = photo.comments[commentIndex].name;
    commentContent.textContent = photo.comments[commentIndex].message;

    return comment;
  }

  // Отображает комментарии в окне увеличенной фотографии
  function renderComments(photo, amount, startCommentsIndex) {
    var photosList = document.querySelectorAll('.picture');
    var fragment = document.createDocumentFragment();

    var renderedCommentsAmount = 0;
    var photoCommentsAmount = photo.parentNode.querySelector('.picture__comments').textContent;
    var commentsAmount = photoCommentsAmount - startCommentsIndex;

    for (var i = 0; i < photosList.length; i++) {
      if (photosList[i] === photo.parentElement) {
        openedPhotoCaption.textContent = window.picture.pictures[i].description;
        openedPhotoLikes.textContent = window.picture.pictures[i].likes;

        var commentsCount = 0;

        if (commentsAmount >= amount) {
          commentsCount = amount;
        } else {
          commentsCount = commentsAmount;
        }

        if (commentsAmount > 0) {
          for (var j = 0; j < commentsCount; j++) {
            fragment.appendChild(getComment(window.picture.pictures[i], j));
          }
        }

        renderedCommentsAmount += commentsCount;

        commentsAmount -= amount;

        openedPhotoComments.appendChild(fragment);
      }
    }

    return renderedCommentsAmount;
  }

  // Закрывает увеличенное изображение
  function closePhoto() {
    openedPhoto.classList.add('hidden');

    openedPhotoCancel.removeEventListener('click', onPhotoCancelClick);
    document.removeEventListener('keydown', onOpenedPhotoEscapePress);

    document.addEventListener('click', onPhotoClick);
  }

  // Показывает увеличенное фото
  function renderBigPhoto(photo) {
    var clickedPhoto;

    if (photo.classList.contains('picture__img')) {
      clickedPhoto = photo;
    } else if (photo.classList.contains('picture')) {
      clickedPhoto = photo.querySelector('.picture__img');
    }

    openedPhotoImg.src = clickedPhoto.src;
    openedPhotoComments.innerHTML = '';

    var renderedCommentsAmount = renderComments(clickedPhoto, 5, 0);

    openedPhoto.classList.remove('hidden');

    openedPhotoCancel.addEventListener('click', onPhotoCancelClick);
    document.addEventListener('keydown', onOpenedPhotoEscapePress);

    document.removeEventListener('click', onPhotoClick);

    // Обработчик клика на кнопку "Загрузить еще", для отображения дополнительных комментариев
    function onCommentsLoaderClick() {
      renderComments(clickedPhoto, 5, renderedCommentsAmount);

      renderedCommentsAmount += 5;
    }

    var commentsLoader = openedPhotoSocial.querySelector('.comments-loader');
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }

  // Обработчик события клика/нажатия Enter на миниатюру
  function onPhotoClick(evt) {
    if (evt.target.classList.contains('picture__img') || evt.target.classList.contains('picture')) {
      evt.preventDefault();

      renderBigPhoto(evt.target);
    }
  }

  // Обработчик нажатия на кнопку закрытия увеличенного изображения
  function onPhotoCancelClick() {
    closePhoto();
  }

  // Обработчик нажатия на "Escape" при открытом увеличенном изображении
  function onOpenedPhotoEscapePress(evt) {
    window.util.isEscEvent(evt, closePhoto);
  }

  document.addEventListener('click', onPhotoClick);
})();
