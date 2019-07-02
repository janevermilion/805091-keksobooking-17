'use strict';
(function () {
  var housingTypeFilter = document.querySelector('#housing-type');
  var quantityOfPinsOnMap = 5;

  window.housingTypeFiltertHandler = function () {

    window.debounce(window.backend.getData(window.updatePins));

  };


  window.updatePins = function (data) {
    var pinsData = window.pinsActions.getPinsData(data);
    window.pinsActions.clear();

    var filteredHouses = window.pinsData.filter(function (it) {
      return it.offer.type === housingTypeFilter.value;
    });

    if (filteredHouses.length > quantityOfPinsOnMap) {
      filteredHouses = filteredHouses.splice((quantityOfPinsOnMap - 1), (filteredHouses.length - quantityOfPinsOnMap));
    }
    if (housingTypeFilter.value === 'any') {
      window.pinsActions.render(pinsData);
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

