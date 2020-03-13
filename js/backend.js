'use strict';

(function () {
  var URL = {
    load: 'https://js.dump.academy/kekstagram/data',
    upload: 'https://js.dump.academy/kekstagram'
  };

  window.backend = {
    loadPhoto: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000;

      xhr.open('GET', URL.load);
      xhr.send();

      xhr.addEventListener('load', function () {
        var error;

        switch (xhr.status) {
          case 200:
            onSuccess(xhr.response);
            break;

          case 400:
            error = 'Неверный запрос';
            break;
          case 401:
            error = 'Пользователь не авторизован';
            break;
          case 404:
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
    },
    uploadPhoto: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000;

      xhr.open('POST', URL.upload);
      xhr.send(data);

      xhr.addEventListener('load', function () {
        var error;

        switch (xhr.status) {
          case 200:
            onSuccess(xhr.response);
            break;

          case 400:
            error = 'Неверный запрос';
            break;
          case 401:
            error = 'Пользователь не авторизован';
            break;
          case 404:
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
  };
})();
