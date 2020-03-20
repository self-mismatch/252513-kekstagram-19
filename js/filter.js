'use strict';

(function () {
  var filtersForm = document.querySelector('.img-filters__form');
  var filters = filtersForm.querySelectorAll('.img-filters__button');

  // Удаляет все изображения
  function deletePictures(pictures) {
    for (var i = 0; i < pictures.length; i++) {
      pictures[i].parentNode.removeChild(pictures[i]);
    }
  }

  // Меняет активную кнопку фильтров изображений
  function changeActiveFilterButton(button) {
    for (var i = 0; i < filters.length; i++) {
      if (button !== filters[i]) {
        filters[i].classList.remove('img-filters__button--active');
      }
    }
  }

  // Меняет фильтр изображений
  function changeActiveFilter(current) {
    var picturesBlock = document.querySelector('.pictures');
    var pictures = picturesBlock.querySelectorAll('.picture');

    var picturesArray = window.picture.pictures.slice();

    current.classList.add('img-filters__button--active');

    var photos = [];

    if (current.id === 'filter-default') {
      photos = picturesArray;
    } else if (current.id === 'filter-random') {
      var uniquePhotos = picturesArray.slice();

      for (var i = 0; i < 10; i++) {
        var randomIndex = window.util.getRandomNumber(0, uniquePhotos.length - 1);

        photos.push(uniquePhotos[randomIndex]);

        uniquePhotos.splice(randomIndex, 1);
      }
    } else if (current.id === 'filter-discussed') {
      var mostDiscussedPhotos = picturesArray.slice();
      mostDiscussedPhotos.sort(function (first, second) {
        return second.likes - first.likes;
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
