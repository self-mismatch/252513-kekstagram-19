'use strict';

(function () {
  // Выводит на экран статус загрузки фотографии
  function renderPhotoUploadStatus(status) {
    var main = document.querySelector('main');
    var statusTemplate = document.querySelector('#' + status).content.querySelector('.' + status).cloneNode(true);

    main.appendChild(statusTemplate);

    // Удаляет блок-статус отправки фотографии
    function deleteStatusBlock() {
      var statusBlock = main.querySelector('.' + status);
      statusBlock.parentNode.removeChild(statusBlock);

      statusButton.removeEventListener('click', onStatusButtonClick);
      document.removeEventListener('keydown', onStatusEscPress);
      document.removeEventListener('click', onStatusOutClick);
    }

    // Обработчик нажатия на кнопку в статусе загрузки фотографии
    function onStatusButtonClick() {
      deleteStatusBlock();
    }

    var statusButton = statusTemplate.querySelector('.' + status + '__button');
    statusButton.addEventListener('click', onStatusButtonClick);

    // Обработчик нажатия на кнопку escape при открытом статусе загрузки фотографии
    function onStatusEscPress(evt) {
      window.util.isEscEvent(evt, deleteStatusBlock);
    }

    document.addEventListener('keydown', onStatusEscPress);

    // Обработчик клика вне области статуса загрузки фотографии
    function onStatusOutClick(evt) {
      if (!evt.target.closest('.success__inner')) {
        deleteStatusBlock();
      }
    }

    document.addEventListener('click', onStatusOutClick);
  }

  window.uploadStatus = function (status) {
    renderPhotoUploadStatus(status);
  };
})();
