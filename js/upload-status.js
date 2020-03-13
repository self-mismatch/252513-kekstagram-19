'use strict';

(function () {
  // Выводит на экран статус загрузки фотографии
  function renderPhotoUploadStatus(status) {
    var main = document.querySelector('main');
    var statusTemplate = document.querySelector('#' + status).content.querySelector('.' + status).cloneNode(true);

    // Удаляет блок-статус отправки фотографии
    function deleteStatusBlock() {
      var statusBlock = main.querySelector('.' + status);
      statusBlock.parentNode.removeChild(statusBlock);

      statusButton.removeEventListener('click', onStatusButtonClick);
    }

    // Обработчик нажатия на кнопку в статусе загрузки фотографии
    function onStatusButtonClick() {
      deleteStatusBlock();
    }

    var statusButton = statusTemplate.querySelector('.' + status + '__button');
    statusButton.addEventListener('click', onStatusButtonClick);

    main.appendChild(statusTemplate);
  }

  window.uploadStatus = function (status) {
    renderPhotoUploadStatus(status);
  };
})();
