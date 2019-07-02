'use strict';
(function () {
  var housingTypeFilter = document.querySelector('#housing-type');

  housingTypeFilter.addEventListener('change', function () {
    window.debounce(function () {
      window.backend.getData(window.updatePins);
    });
  });

  window.updatePins = function (data) {
    window.pinsActions.getPinsData(data);
    var pinsData = data;

    window.pinsActions.clear();

    var filteredHouses = window.pinsData.filter(function (it) {
      return it.offer.type === housingTypeFilter.value;
    });
    if (housingTypeFilter.value === 'any') {
      filteredHouses = pinsData;
    }

    window.pinsActions.render(filteredHouses);

  };

/* var filterForm = document.querySelector('.map__filters');
  var filterValues = [];
  filterForm.addEventListener('change', function(evt){
  var selectedValue = evt.target.value;
  filterValues.push(selectedValue)

}) */

})();

