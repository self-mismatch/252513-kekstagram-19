'use strict';

(function () {
  var COMMENTS_PER_CLICK = 5;

  var body = document.body;

  var openedPhoto = document.querySelector('.big-picture');
  var openedPhotoCancel = openedPhoto.querySelector('.big-picture__cancel');
  var openedPhotoImg = openedPhoto.querySelector('.big-picture__img img');

  var openedPhotoSocial = openedPhoto.querySelector('.social');
  var openedPhotoComments = openedPhotoSocial.querySelector('.social__comments');
  var openedPhotoCommentsCount = openedPhotoSocial.querySelector('.social__comment-count');
  var openedPhotoDescription = openedPhotoSocial.querySelector('.social__caption');
  var openedPhotoLikesCount = openedPhotoSocial.querySelector('.likes-count');

  var commentTemplate = openedPhotoComments.querySelector('.social__comment');
  var commentsLoader = openedPhotoSocial.querySelector('.comments-loader');

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
    if (photo.comments.length > startCommentsIndex) {
      var allCommentsAmount = photo.comments.length;
      var renderedCommentsAmount = startCommentsIndex;
      var notRenderedCommentsAmount = allCommentsAmount - renderedCommentsAmount;

      var commentsToRenderAmount = 0;

      if (notRenderedCommentsAmount > amount) {
        commentsToRenderAmount = amount;
      } else {
        commentsToRenderAmount = notRenderedCommentsAmount;

        commentsLoader.classList.add('hidden');
      }

      var fragment = document.createDocumentFragment();

      for (var i = 0; i < commentsToRenderAmount; i++) {
        fragment.appendChild(getComment(photo, i));
        renderedCommentsAmount++;
      }

      openedPhotoComments.appendChild(fragment);

      var commentsCountWord = allCommentsAmount % 10 === 1 ? 'комментария' : 'комментариев';

      var commentsCount = renderedCommentsAmount + ' из ' + allCommentsAmount + ' ' + commentsCountWord;
      openedPhotoCommentsCount.textContent = commentsCount;

      return renderedCommentsAmount;
    } else {
      return 0;
    }
  }

  // Закрывает увеличенное изображение
  function closePhoto() {
    body.classList.remove('modal-open');

    openedPhoto.classList.add('hidden');
    commentsLoader.classList.remove('hidden');

    openedPhotoCancel.removeEventListener('click', onPhotoCancelClick);
    document.removeEventListener('keydown', onOpenedPhotoEscapePress);

    document.addEventListener('click', onPhotoClick);
  }

  // Показывает увеличенное фото
  function openPhoto(photo) {
    body.classList.add('modal-open');

    var clickedPhoto;

    if (photo.classList.contains('picture__img')) {
      clickedPhoto = photo;
    } else if (photo.classList.contains('picture')) {
      clickedPhoto = photo.querySelector('.picture__img');
    }

    var photoInfo = clickedPhoto.parentElement;
    var photoSource = clickedPhoto.getAttribute('src');
    var photoCommentsAmount = parseInt(photoInfo.querySelector('.picture__comments').textContent, 10);
    var photoLikesAmount = parseInt(photoInfo.querySelector('.picture__likes').textContent, 10);

    var photos = window.picture.pictures.slice();

    for (var i = 0; i < photos.length; i++) {
      if (photoSource === photos[i].url && photoCommentsAmount === photos[i].comments.length && photoLikesAmount === photos[i].likes) {
        clickedPhoto = photos[i];
        break;
      }
    }

    openedPhotoImg.src = clickedPhoto.url;
    openedPhotoDescription.textContent = clickedPhoto.description;
    openedPhotoLikesCount.textContent = clickedPhoto.likes;
    openedPhotoComments.innerHTML = '';

    var renderedCommentsAmount = renderComments(clickedPhoto, 5, 0);

    openedPhoto.classList.remove('hidden');

    openedPhotoCancel.addEventListener('click', onPhotoCancelClick);
    document.addEventListener('keydown', onOpenedPhotoEscapePress);

    document.removeEventListener('click', onPhotoClick);

    // Обработчик клика на кнопку "Загрузить еще", для отображения дополнительных комментариев
    function onCommentsLoaderClick() {
      renderComments(clickedPhoto, COMMENTS_PER_CLICK, renderedCommentsAmount);

      renderedCommentsAmount += COMMENTS_PER_CLICK;
    }

    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }

  var commentInput = openedPhotoSocial.querySelector('.social__footer-text');
  var hasCommentInputFocus = false;

  function onCommentInputFocus() {
    hasCommentInputFocus = true;
  }

  function onCommentInputBlur() {
    hasCommentInputFocus = false;
  }

  commentInput.addEventListener('focus', onCommentInputFocus);
  commentInput.addEventListener('blur', onCommentInputBlur);

  // Обработчик события клика/нажатия Enter на миниатюру
  function onPhotoClick(evt) {
    if (evt.target.classList.contains('picture__img') || evt.target.classList.contains('picture')) {
      evt.preventDefault();

      openPhoto(evt.target);
    }
  }

  // Обработчик нажатия на кнопку закрытия увеличенного изображения
  function onPhotoCancelClick() {
    closePhoto();
  }

  // Обработчик нажатия на "Escape" при открытом увеличенном изображении
  function onOpenedPhotoEscapePress(evt) {
    if (!hasCommentInputFocus) {
      window.util.isEscEvent(evt, closePhoto);
    }
  }

  document.addEventListener('click', onPhotoClick);
})();
