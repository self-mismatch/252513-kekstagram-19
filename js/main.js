'use strict';

var photos = [];
var descriptions = ['Прекрасно!', 'Печаль :(', 'Моё :)', 'Столько необычного...']
var commentators = ['Bob', 'Sarah', 'Emily', 'Антон', 'Алиса', 'Елена', 'Евгений', 'Max', 'Алла', 'Sam', 'Юрий', 'Ted'];
var commentsContent = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

function getRandomNumber(min, max) {
  var number = Math.floor(min + Math.random() * (max + 1 - min));

  return number;
}

function getRandomUrl() {
  var url = 'photos/' + getRandomNumber(1, 6) + '.jpg';

  return url;
}

function getRandomDescription() {
  var description = descriptions[getRandomNumber(0, descriptions.length - 1)];

  return description;
}

function getRandomAmountOfLikes() {
  var likes = getRandomNumber(15, 200);

  return likes;
}

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

function getRandomPhoto() {
  var photo = {};

  photo.url = getRandomUrl();
  photo.description = getRandomDescription();
  photo.likes = getRandomAmountOfLikes();
  photo.comments = getRandomComments(getRandomNumber(1, 6));

  return photo;
}

function fillPhotosArray(amount) {
  for (var i = 0; i < amount; i++) {
    var photo = getRandomPhoto();

    photos.push(photo);
  }
}

fillPhotosArray(25);

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

function renderPhoto(photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement;
}

var fragment = document.createDocumentFragment();

function createPhotoElements() {
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
}

createPhotoElements();

var picturesList = document.querySelector('.pictures');
picturesList.appendChild(fragment);
