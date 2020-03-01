'use strict';

(function () {
  var imgUpload = document.querySelector('.img-upload__preview img');

  var slider = document.querySelector('.effect-level__line');
  var sliderValue = 100;

  var pin = slider.querySelector('.effect-level__pin');

  var sliderLine = slider.querySelector('.effect-level__depth');

  function changeFilterSaturation(value) {

    switch (window.activeFilter) {
      case 'chrome':
        imgUpload.style.filter = 'grayscale(' + value + ')';
        break;

      case 'sepia':
        imgUpload.style.filter = 'sepia(' + value + ')';
        break;

      case 'marvin':
        imgUpload.style.filter = 'invert(' + value * 100 + '%)';
        break;

      case 'phobos':
        imgUpload.style.filter = 'blur(' + value * 3 + 'px)';
        break;

      case 'heat':
        imgUpload.style.filter = 'brightness(' + (value * 2 + 1) + ')';
        break;
    }
  }

  function onMouseDown(downEvt) {
    downEvt.preventDefault();

    var sliderWidth = window.sliderWidth;
    var pinWidth = window.pinWidth;

    var startX = downEvt.clientX;
    var shiftX = startX - pin.getBoundingClientRect().left;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      sliderValue = Math.round(pin.offsetLeft / (sliderWidth - pinWidth) * 100);

      var leftMove = moveEvt.clientX - shiftX - slider.getBoundingClientRect().left;

      if (leftMove <= window.leftEdge) {
        leftMove = window.leftEdge;
      } else if (leftMove >= window.rightEdge) {
        leftMove = window.rightEdge;
      }

      pin.style.left = leftMove + 'px';
      sliderLine.style.width = leftMove + pinWidth / 2 + 'px';

      changeFilterSaturation(sliderValue / 100);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  pin.addEventListener('mousedown', onMouseDown);
})();
