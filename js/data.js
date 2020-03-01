'use strict';

(function () {
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

  window.data = {
    photos: photos
  }
})();
