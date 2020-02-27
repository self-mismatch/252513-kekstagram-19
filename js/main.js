'use strict';

var ESCAPE = 'Escape';

var photos = [];
var descriptions = ['Прекрасно!', 'Счастье!', 'Моё :)', 'Столько необычного...', 'Море ❤️'];
var commentators = ['Bob', 'Sarah', 'Emily', 'Антон', 'Алиса', 'Елена', 'Евгений', 'Max', 'Алла', 'Sam', 'Юрий', 'Ted'];
var commentsContent = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

// Возвращает случайное число в диапазоне от "min" до "max", включая пограничные значения
function getRandomNumber(min, max) {
  var number = Math.floor(min + Math.random() * (max + 1 - min));

  return number;
}

// Возвращает адрес изображения со случайной цифрой в названии
function getRandomUrl(src, format, min, max, prefix) {
  var url = src + prefix + getRandomNumber(min, max) + '.' + format;

  return url;
}

// Возвращает случайное описание фотографии
function getRandomDescription() {
  var description = descriptions[getRandomNumber(0, descriptions.length - 1)];

  return description;
}

// Возвращает случайное количество лайков
function getRandomAmountOfLikes() {
  var likes = getRandomNumber(15, 200);

  return likes;
}

// Возвращает массив с указанным в параметрах числом случайных комментарпев
function getRandomComments(amount) {
  var comments = [];

  for (var i = 0; i < amount; i++) {
    var comment = {};

    comment.avatar = getRandomUrl('img/', 'svg', 1, 6, 'avatar-');
    comment.message = commentsContent[getRandomNumber(0, commentsContent.length - 1)];
    comment.name = commentators[getRandomNumber(0, commentators.length - 1)];

    comments.push(comment);
  }

  return comments;
}

// Возвращает фото со случайными параметрами
function getRandomPhoto() {
  var photo = {};

  photo.url = getRandomUrl('photos/', 'jpg', 1, 25, '');
  photo.description = getRandomDescription();
  photo.likes = getRandomAmountOfLikes();
  photo.comments = getRandomComments(getRandomNumber(1, 6));

  return photo;
}

// Заполняет массив указанным в параметре числом фотографий
function fillPhotosArray(amount) {
  for (var i = 0; i < amount; i++) {
    var photo = getRandomPhoto();

    photos.push(photo);
  }
}

fillPhotosArray(25);

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
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
}

renderPhotoElements();

var picturesList = document.querySelector('.pictures');
picturesList.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');

// var bigPictureimg = bigPicture.querySelector('.big-picture__img');
// var bigPictureCaption = bigPicture.querySelector('.social__caption');
// var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
// var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');


// Выводит на экран открытое фото с комментариями
// function renderOpenedPhoto(photo) {
//   bigPictureimg.src = photo.url;
//   bigPictureCaption.textContent = photo.description;
//   bigPictureLikesCount.textContent = photo.likes;
//   bigPictureCommentsCount.textContent = photo.comments.length;
//   bigPictureCommentsBlock.appendChild(createComment(photo, 0));
// }

// renderOpenedPhoto(photos[0]);

var commentsCount = bigPicture.querySelector('.social__comment-count');
commentsCount.classList.add('hidden');

var commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');


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

uploadFile.addEventListener('change', onImgUploadChange);

// Показывает форму редактирования изображения и вешает обработчики на внутренние элементы
function openImgEditor() {
  document.body.classList.add('modal-open');
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
}

// Скрывает форму редактирования изображения и удаляет все обработчики внутренних элементов
function closeImgEditor() {
  document.body.classList.remove('modal-open');
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
  if (evt.key === ESCAPE && !hasHashtagsFocus && !hasCommentFocus) {
    closeImgEditor();
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

// Удаляет фильтры с фотографии
function deleteImgFilters() {
  imgUploadPreview.removeAttribute('style');
  imgUploadPreview.removeAttribute('class');
}

// Меняет фильтр на фотографии
function changeimgFilter(filter) {
  deleteImgFilters();
  imgUploadPreview.classList.add(filter);
}

// Обрабатывает смену фильтров и применяет выбранный фильтр на фотографию
function onImgFilterChange(evt) {
  if (evt.target.classList.contains('effects__radio')) {
    changeimgFilter('effects__preview--' + evt.target.value);
    window.activeFilter = evt.target.value;
  }
}
