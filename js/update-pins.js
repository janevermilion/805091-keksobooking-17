'use strict';
(function () {
  var housingTypeFilter = document.querySelector('#housing-type');

  housingTypeFilter.addEventListener('change', function () {
    window.debounce(function () {
      window.updatePins();
    });
  });

  window.updatePins = function () {

    window.pinsActions.clear();
    var filteredHouses;
    if (housingTypeFilter.value === 'any') {
      filteredHouses = window.pinsData;
    } else {
        filteredHouses = window.pinsData.filter(function (it) {
        return it.offer.type === housingTypeFilter.value;
      });
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

