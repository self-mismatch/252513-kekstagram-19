'use strict';
(function () {
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
      if (key === 'hasSimilarHashtags') {
        hashtagsValidity[key] = false;
      } else {
        hashtagsValidity[key] = true;
      }
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

      if (hashtags.length > 5) {
        errorMessage += 'Нельзя указать больше 5 хештегов; ';
      }

      for (var i = 0; i < hashtags.length; i++) {

        if (hashtags[i].length === 0 && hashtagsValidity.hasOneSpace) {
          errorMessage += 'Хеш-теги должны разделяться одним пробелом; ';
          hashtagsValidity.hasOneSpace = false;
        }

        if (hashtags[i].length > 20 && hashtagsValidity.hasAuthorizedLength) {
          errorMessage += 'Максимальная длина одного хеш-тега, включая символ "#", 20 символов; ';
          hashtagsValidity.hasAuthorizedLength = false;
        }

        if (!checkHashtagWithPattern(hashtags[i]) && hashtagsValidity.hasAuthorizedSymbols && hashtags[i].length > 1) {
          errorMessage += 'Хеш-теги могут состоять только из букв, чисел и символа "#" в начале; ';
          hashtagsValidity.hasAuthorizedSymbols = false;
        }

        if (!checkForHash(hashtags[i]) && hashtagsValidity.hasFirstHash) {
          errorMessage += 'Хеш-теги должны начинаться с символа "#"; ';
          hashtagsValidity.hasFirstHash = false;
        } else if (checkForHash(hashtags[i]) && hashtags[i].length === 1) {
          errorMessage += 'Хеш-тег не может состоять только из одной решётки; ';
        }

        if (checkForSimilarHashtags(hashtags, i) && !hashtagsValidity.hasSimilarHashtags) {
          errorMessage += 'Хеш-теги не могут повторяться; ';
          hashtagsValidity.hasSimilarHashtags = true;
        }
      }

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
