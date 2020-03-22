'use strict';

(function () {
  var filtersForm = document.querySelector('.img-filters__form');
  var filters = filtersForm.querySelectorAll('.img-filters__button');

  // Удаляет все изображения
  function deletePictures(pictures) {
    Array.from(pictures).forEach(function (picture) {
      picture.parentNode.removeChild(picture);
    });
  }

  // Меняет активную кнопку фильтров изображений
  function changeActiveFilterButton(clickedButton) {
    Array.from(filters).forEach(function (currentButton) {
      if (clickedButton !== currentButton) {
        return currentButton.classList.remove('img-filters__button--active');
      } else {
        return currentButton;
      }
    });
  }

  // Меняет фильтр изображений
  function changeActiveFilter(current) {
    var picturesBlock = document.querySelector('.pictures');
    var pictures = picturesBlock.querySelectorAll('.picture');

    var picturesArray = window.picture.pictures.slice();

    current.classList.add('img-filters__button--active');

    var photos = [];

    if (current.id === 'filter-default') {
      photos = picturesArray.slice();
    } else if (current.id === 'filter-random') {
      var uniquePhotos = picturesArray.slice();

      for (var i = 0; i < 10; i++) {
        var randomIndex = window.util.getRandomNumber(0, uniquePhotos.length - 1);

        photos.push(uniquePhotos[randomIndex]);

        uniquePhotos.splice(randomIndex, 1);
      }
    } else if (current.id === 'filter-discussed') {
      var mostDiscussedPhotos = picturesArray.slice().sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });

      photos = mostDiscussedPhotos.slice();
    }

    window.debounce(function () {
      deletePictures(pictures);

      window.picture.renderPhotos(photos);
    });
  }

  function onFilterChange(evt) {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      changeActiveFilter(evt.target);
      changeActiveFilterButton(evt.target);
    }
  }

  filtersForm.addEventListener('click', onFilterChange);
})();
