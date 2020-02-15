'use strict';

(function () {
  var effectSlider = document.querySelector('.img-upload__effect-level');
  var effectSliderLine = effectSlider.querySelector('.effect-level__line');
  var effectSliderDepth = effectSliderLine.querySelector('.effect-level__depth');
  var effectSliderPin = effectSliderLine.querySelector('.effect-level__pin');

  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var filters = document.querySelectorAll('.effects__radio');
  var activeFilter = '';
  var effectValue = 0;

  function onMouseDown(evt) {
    evt.preventDefault();

    for (var i = 0; i < filters.length; i++) {
      if (filters[i].checked === true) {
        activeFilter = filters[i].value;
      }
    }

    var startXCoordinate = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var moveXCoordinate = startXCoordinate - moveEvt.clientX;

      startXCoordinate = moveEvt.clientX;

      if (startXCoordinate > effectSliderLine.getBoundingClientRect().left && startXCoordinate < effectSliderLine.getBoundingClientRect().left + effectSliderLine.offsetWidth) {
        effectSliderPin.style.left = (effectSliderPin.offsetLeft - moveXCoordinate) + 'px';
        effectSliderDepth.style.width = effectSliderPin.offsetLeft + 'px';
      }

      effectValue = effectSliderPin.offsetLeft / effectSliderLine.offsetWidth;

      switch (activeFilter) {
        case 'chrome':
          imgUploadPreview.style.filter = 'grayscale(' + effectValue + ')';
          break;

        case 'sepia':
          imgUploadPreview.style.filter = 'sepia(' + effectValue + ')';
          break;

        case 'marvin':
          imgUploadPreview.style.filter = 'invert(' + effectValue * 100 + '%)';
          break;

        case 'phobos':
          imgUploadPreview.style.filter = 'blur(' + effectValue * 3 + 'px)';
          break;

        case 'heat':
          imgUploadPreview.style.filter = 'brightness(' + (effectValue * 2 + 1) + ')';
          break;
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  effectSliderPin.addEventListener('mousedown', onMouseDown);
})();
