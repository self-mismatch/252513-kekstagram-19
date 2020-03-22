'use strict';
(function () {
  var HASHTAGS_MAX_AMOUNT = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MIN_LENGTH = 2;

  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadText = imgUploadForm.querySelector('.img-upload__text');
  var hashtagsInput = imgUploadText.querySelector('.text__hashtags');
  var imgUploadButton = imgUploadForm.querySelector('.img-upload__submit');

  var hasInputChange = false;

  // Меняет флаг, показывающий наличие изменений в поле ввода
  function toggleInputChangeState(state) {
    hasInputChange = state;
  }

  // Объект с флагами, показывающими результат проверок валидности хеш-тегов
  var hashtagsValidity = {
    hasOneSpace: true,
    hasFirstHash: true,
    hasAuthorizedLength: true,
    hasAuthorizedSymbols: true,
    hasSimilarHashtags: false
  };

  var hashtags = [];

  // Разбивает строку на массив
  function doHashtagsArray() {
    hashtags = hashtagsInput.value.toLowerCase().split(' ');
  }

  // Удаляет состояние ошибки с поля ввода хеш-тегов
  function resetHashtagsErrors() {
    hashtagsInput.setCustomValidity('');

    Object.keys(hashtagsValidity).forEach(function (key) {
      hashtagsValidity[key] = key === 'hasSimilarHashtags' ? false : true;
    });
  }

  // Проверяет наличие символа "#" в начале хеш-тега
  function checkForHash(hashtag) {
    return hashtag[0] === '#';
  }

  // Проверяет соответствие хеш-тега набору разрешенных символов
  function checkHashtagWithPattern(hashtag) {
    var pattern = /^[A-Za-zА-Яа-яЁё0-9\#]+$/;
    var result = pattern.test(hashtag);

    return result;
  }

  // Ищет в массиве одинаковые хеш-теги
  function checkForSimilarHashtags(array, currentIndex) {
    var result = false;

    if (currentIndex !== array.length - 1) {

      for (var j = currentIndex + 1; j < array.length; j++) {
        if (array[currentIndex] === array[j]) {
          result = array[j];
          break;
        }
      }
    }

    return result;
  }

  // Проверяет поле с хеш-тегами на валидность
  function checkHashtagsValidity() {
    if (hashtagsInput.value !== '' && hasInputChange) {
      toggleInputChangeState(false);
      doHashtagsArray();

      var errorMessage = '';

      if (hashtags.length > HASHTAGS_MAX_AMOUNT) {
        errorMessage += 'Нельзя указать больше ' + HASHTAGS_MAX_AMOUNT + ' хештегов;';
      }

      hashtags.forEach(function (hashtag, i) {
        if (hashtag.length === 0 && hashtagsValidity.hasOneSpace) {
          errorMessage += 'Хеш-теги должны разделяться одним пробелом; ';
          hashtagsValidity.hasOneSpace = false;
        }

        if (hashtag.length > HASHTAG_MAX_LENGTH && hashtagsValidity.hasAuthorizedLength) {
          errorMessage += 'Максимальная длина одного хеш-тега, включая символ "#", ' + HASHTAG_MAX_LENGTH + ' символов; ';
          hashtagsValidity.hasAuthorizedLength = false;
        }

        if (!checkHashtagWithPattern(hashtag) && hashtagsValidity.hasAuthorizedSymbols && hashtag.length >= HASHTAG_MIN_LENGTH) {
          errorMessage += 'Хеш-теги могут состоять только из букв, чисел и символа "#" в начале; ';
          hashtagsValidity.hasAuthorizedSymbols = false;
        }

        if (!checkForHash(hashtag) && hashtagsValidity.hasFirstHash) {
          errorMessage += 'Хеш-теги должны начинаться с символа "#"; ';
          hashtagsValidity.hasFirstHash = false;
        } else if (checkForHash(hashtag) && hashtag.length < HASHTAG_MIN_LENGTH) {
          errorMessage += 'Хеш-тег не может состоять только из одной решётки; ';
        }

        if (checkForSimilarHashtags(hashtags, i) && !hashtagsValidity.hasSimilarHashtags) {
          errorMessage += 'Хеш-теги не могут повторяться; ';
          hashtagsValidity.hasSimilarHashtags = true;
        }
      });

      hashtagsInput.setCustomValidity(errorMessage);
    }
  }

  function onHashtagsInput() {
    toggleInputChangeState(true);
    resetHashtagsErrors();
  }

  function onSubmitButtonClick() {
    checkHashtagsValidity();
  }

  hashtagsInput.addEventListener('input', onHashtagsInput);
  imgUploadButton.addEventListener('click', onSubmitButtonClick);
})();
