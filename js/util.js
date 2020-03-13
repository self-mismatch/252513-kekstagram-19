'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },
    renderError: function (errorMessage) {
      var errorBlock = document.createElement('div');

      errorBlock.style = 'position: absolute; z-index: 100; top: 0; right: 0; left: 0; margin: 0; padding: 5px; font-size: 14px; text-align: center; color: white; background-color: red;';
      errorBlock.textContent = errorMessage;

      document.body.insertAdjacentElement('afterbegin', errorBlock);
    }
  };
})();
