'use strict';
(function () {

  var filterForm = document.querySelector('.map__filters');
  filterForm.addEventListener('change', function (evt) {
    var selectedValue = evt.target;
    window.debounce(function () {
      window.updatePins(selectedValue);
    });
  });


  window.updatePins = function (filterData) {
    var typeOfData = filterData.name.slice(8).toString();

    window.pinsActions.clear();
    var filteredHouses;

    if (filterData.value === 'any') {
      filteredHouses = window.pinsData;
    }
    if (typeOfData === 'price') {
      filteredHouses = window.pinsData.filter(function (it) {
        if (filterData.value === 'middle') {
          return it.offer.price > 10000 && it.offer.price < 50000;
        }
        if (filterData.value === 'low') {
          return it.offer.price < 10000;
        }
        if (filterData.value === 'high') {
          return it.offer.price > 50000;
        }
        return filteredHouses;
      });
    } else {
      filteredHouses = window.pinsData.filter(function (it) {
        return it.offer[typeOfData] === filterData.value;
      });
    }

    window.pinsActions.render(filteredHouses);

  };

})();

