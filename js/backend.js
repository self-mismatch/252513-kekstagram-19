'use strict';

(function () {
  var URL = {
    load: 'https://js.dump.academy/kekstagram/data',
    upload: 'https://js.dump.academy/kekstagram'
  };

  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  var XHR_TIMEOUT = 10000;

  function getNewXhr(data, type, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    var url = data ? URL.upload : URL.load;

    xhr.open(type, url);
    xhr.send(data);

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case Code.SUCCESS:
          onSuccess(xhr.response);
          break;

        case Code.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case Code.UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case Code.NOT_FOUND:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения, проверьте подключение к интернету');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  }

  window.backend = {
    loadPhotos: function (data, type, onSuccess, onError) {
      getNewXhr(data, type, onSuccess, onError);
    },
    uploadPhoto: function (data, type, onSuccess, onError) {
      getNewXhr(data, type, onSuccess, onError);
    }
  };
})();
