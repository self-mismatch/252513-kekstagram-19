'use strict';

var photos = [];
var descriptions = ['Прекрасно!', 'Счастье!', 'Моё :)', 'Столько необычного...', 'Море ❤'];
var commentators = ['Bob', 'Sarah', 'Emily', 'Антон', 'Алиса', 'Елена', 'Евгений', 'Max', 'Алла', 'Sam', 'Юрий', 'Ted'];
var commentsContent = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

// Возвращает случайное число в диапазоне от "min" до "max", включая пограничные значения
function getRandomNumber(min, max) {
  var number = Math.floor(min + Math.random() * (max + 1 - min));

  return number;
}

// Возвращает случайный адрес изображения фотографии
function getRandomUrl() {
  var url = 'photos/' + getRandomNumber(1, 6) + '.jpg';

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

    comment.avatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    comment.message = commentsContent[getRandomNumber(0, commentsContent.length - 1)];
    comment.name = commentators[getRandomNumber(0, commentators.length - 1)];

    comments.push(comment);
  }

  return comments;
}

// Возвращает фото со случайными параметрами
function getRandomPhoto() {
  var photo = {};

  photo.url = getRandomUrl();
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
var bigPictureImage = bigPicture.querySelector('.big-picture__img');
var bigPictureCaption = bigPicture.querySelector('.social__caption');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var bigPictureCommentsBlock = bigPicture.querySelector('.social__comments');
bigPicture.classList.remove('hidden');

var commentTemplate = bigPictureCommentsBlock.querySelector('.social__comment');

// Возвращает комментарий с параметрами, заданными в передающемся элементе массива с фотографиями
function createComment(photo) {
  var comment = commentTemplate.cloneNode(true);
  var picture = comment.querySelector('.social__picture');
  var commentContent = comment.querySelector('.social__text');

  picture.src = photo.url;
  picture.alt = photo.comments[0].name;
  commentContent.textContent = photo.comments[0].message;

  return comment;
}

// Выводит на экран открытое фото с комментариями
function renderOpenedPhoto(photo) {
  bigPictureImage.src = photo.url;
  bigPictureCaption.textContent = photo.description;
  bigPictureLikesCount.textContent = photo.likes;
  bigPictureCommentsCount.textContent = photo.comments.length;
  bigPictureCommentsBlock.appendChild(createComment(photo));
}

renderOpenedPhoto(photos[0]);

var commentsCount = bigPicture.querySelector('.social__comment-count');
commentsCount.classList.add('hidden');

var commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

document.body.classList.add('modal-open');
