'use strict';
(function () {
  var housingTypeFilter = document.querySelector('#housing-type');

  //housingTypeFilter.addEventListener('change', housingTypeFiltertHandler);

  window.housingTypeFiltertHandler = function () {



    updatePins();
    //housingTypeSelect.removeEventListener('change', housingTypeFilterHandler);
  }
var clearPins = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var updatePins = function () {
    var map = document.querySelector('.map');
    clearPins();

    var filteredHouses = window.pinsData.filter( function(it) {
      return it.offer.type === housingTypeFilter.value
    });


    if (housingTypeFilter.value === 'any') {
      map.appendChild(window.getPinsFragment(pinsData));
    };

    map.appendChild(window.getPinsFragment(filteredHouses));






}






})();

