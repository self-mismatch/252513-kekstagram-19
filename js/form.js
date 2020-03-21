'use strict';

(function () {
  var DEFAULT_SCALE = '100%';

  var body = document.body;

  var imgUpload = document.querySelector('.img-upload');
  var imgUploadForm = imgUpload.querySelector('.img-upload__form');
  var uploadFile = imgUpload.querySelector('#upload-file');

  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
  var effectsPreviews = imgUpload.querySelectorAll('.effects__preview');

  var imgEditor = imgUpload.querySelector('.img-upload__overlay');
  var imgEditorCancel = imgEditor.querySelector('.img-upload__cancel');

  var imgUploadText = imgEditor.querySelector('.img-upload__text');
  var imgHashtags = imgUploadText.querySelector('.text__hashtags');
  var imgComment = imgUploadText.querySelector('.text__description');

  var hasHashtagsFocus = false;
  var hasCommentFocus = false;

  // Показывает форму редактирования изображения и вешает обработчики на внутренние элементы
  function openImgEditor() {
    body.classList.add('modal-open');
    imgEditor.classList.remove('hidden');

    imgEditorCancel.addEventListener('click', closeImgEditor);
    document.addEventListener('keydown', onImgEditorEscPress);

    scaleControlSmall.addEventListener('click', onControlSmallClick);
    scaleControlBig.addEventListener('click', onControlBigClick);

    imgUploadForm.addEventListener('change', onImgFilterChange);

    imgHashtags.addEventListener('focus', onHashtagsFocus);
    imgHashtags.addEventListener('blur', onHashtagsBlur);

    imgComment.addEventListener('focus', onCommentFocus);
    imgComment.addEventListener('blur', onCommentBlur);

    uploadFile.removeEventListener('change', onImgUploadChange);

    window.sliderWidth = document.querySelector('.effect-level__line').offsetWidth;
    window.pinWidth = document.querySelector('.effect-level__pin').offsetWidth;

    window.leftEdge = -window.pinWidth / 2;
    window.rightEdge = window.sliderWidth - window.pinWidth / 2;

    slider.classList.add('effect-level--hidden');
  }

  // Скрывает форму редактирования изображения и удаляет все обработчики внутренних элементов
  function closeImgEditor() {
    body.classList.remove('modal-open');
    imgEditor.classList.add('hidden');

    imgEditorCancel.removeEventListener('click', closeImgEditor);
    document.removeEventListener('keydown', onImgEditorEscPress);

    scaleControlSmall.removeEventListener('click', onControlSmallClick);
    scaleControlBig.removeEventListener('click', onControlBigClick);

    imgUploadForm.removeEventListener('change', onImgFilterChange);

    imgHashtags.removeEventListener('focus', onHashtagsFocus);
    imgHashtags.removeEventListener('blur', onHashtagsBlur);

    imgComment.removeEventListener('focus', onCommentFocus);
    imgComment.removeEventListener('blur', onCommentBlur);

    uploadFile.addEventListener('change', onImgUploadChange);

    deleteImgFilters();
    resetUploadFile();
  }

  // Меняет изображение в форме редактирования на загруженное
  function changeUploadImg() {
    var file = uploadFile.files[0];
    var fileSrc = window.URL.createObjectURL(file);
    imgUploadPreview.src = fileSrc;

    for (var i = 0; i < effectsPreviews.length; i++) {
      effectsPreviews[i].style.backgroundImage = 'url("' + fileSrc + '")';
    }
  }

  // Обработчик нажатия на кнопку загрузки изображения
  function onImgUploadChange() {
    changeUploadImg();
    openImgEditor();
  }

  uploadFile.addEventListener('change', onImgUploadChange);

  // Обработчик нажатия на кнопку уменьшения фотографии
  function onControlSmallClick() {
    resizeImg('-');
  }

  // Обработчик нажатия на кнопку увеличения фотографии
  function onControlBigClick() {
    resizeImg('+');
  }

  // Обработчик нажатия на Escape при открытой форме редактирования изображения
  function onImgEditorEscPress(evt) {

    if (!hasHashtagsFocus && !hasCommentFocus) {
      window.util.isEscEvent(evt, closeImgEditor);
    }
  }

  // Меняет логическое значение переменной на противоположное при фокусе/снятии фокуса
  function toggleFocusState(input, state) {

    if (input === hasHashtagsFocus) {
      hasHashtagsFocus = state;
    } else {
      hasCommentFocus = state;
    }
  }

  // Обработчик состояния фокуса на поле с хеш-тегами
  function onHashtagsFocus() {
    toggleFocusState(hasHashtagsFocus, true);
  }

  // Обработчик состояния потери фокуса с поля с хеш-тегами
  function onHashtagsBlur() {
    toggleFocusState(hasHashtagsFocus, false);
  }

  // Обработчик состояния фокуса на поле с комментарием
  function onCommentFocus() {
    toggleFocusState(hasCommentFocus, true);
  }

  // Обработчик состояния потери фокуса с поля с комментарием
  function onCommentBlur() {
    toggleFocusState(hasCommentFocus, false);
  }

  // Сбрасывает значение инпута загрузки файла и возвращает дефолтное изображение
  function resetUploadFile() {
    uploadFile.value = '';
    imgUploadPreview.src = 'img/upload-default-image.jpg';

    for (var i = 0; i < effectsPreviews.length; i++) {
      effectsPreviews[i].removeAttribute('style');
    }
  }

  var scaleControlSmall = imgEditor.querySelector('.scale__control--smaller');
  var scaleControlValue = imgEditor.querySelector('.scale__control--value');
  var scaleControlBig = imgEditor.querySelector('.scale__control--bigger');

  // Меняет изображение (уменьшает / увеличивает) в зависимости от переданного аргумента
  function resizeImg(operator) {
    var value = parseInt(scaleControlValue.value, 10);

    if (value < 100 && operator === '+') {
      value += 25;
    } else if (value > 25 && operator === '-') {
      value -= 25;
    }

    scaleControlValue.value = value + '%';
    imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
  }

  var slider = document.querySelector('.img-upload__effect-level');
  var sliderLine = slider.querySelector('.effect-level__depth');
  var pin = slider.querySelector('.effect-level__pin');

  // Удаляет фильтры с фотографии
  function deleteImgFilters() {
    imgUploadPreview.removeAttribute('style');
    imgUploadPreview.removeAttribute('class');
  }

  // Меняет фильтр на фотографии
  function changeImgFilter(filter) {
    deleteImgFilters();

    imgUploadPreview.classList.add(filter);
  }

  // Сбрасывает фильтр и ползунок к начальным значениям
  function makeDefaultImg() {
    deleteImgFilters();

    scaleControlValue.value = DEFAULT_SCALE;

    pin.style.left = window.rightEdge + 'px';
    sliderLine.style.width = '100%';
  }

  // Обрабатывает смену фильтров и применяет выбранный фильтр на фотографию
  function onImgFilterChange(evt) {
    if (evt.target.classList.contains('effects__radio')) {
      makeDefaultImg();

      if (evt.target.value !== 'none') {
        if (slider.classList.contains('effect-level--hidden')) {
          slider.classList.remove('effect-level--hidden');
        }

        if (evt.target.classList.contains('effects__radio')) {
          changeImgFilter('effects__preview--' + evt.target.value);
          window.activeFilter = evt.target.value;
        }
      } else {
        slider.classList.add('effect-level--hidden');
      }
    }
  }

  function onPhotoUploadSuccess() {
    closeImgEditor();
    window.uploadStatus('success');
  }

  function onPhotoUploadError() {
    closeImgEditor();
    window.uploadStatus('error');
  }

  // Обработчик отправки формы на сервер
  function onImgFormSubmit(evt) {
    evt.preventDefault();

    window.backend.uploadPhoto(new FormData(imgUploadForm), onPhotoUploadSuccess, onPhotoUploadError);
  }

  imgUploadForm.addEventListener('submit', onImgFormSubmit);
})();
