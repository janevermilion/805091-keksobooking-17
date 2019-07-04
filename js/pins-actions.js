

'use strict';

(function () {

  window.pinsActions = {

    setData: function (array) {
      window.pinsData = array;
    },

    render: function (array) {
      var map = document.querySelector('.map');
      if (array.length > window.constants.NUMBER_OF_PINS_ON_MAP) {
        var slicedArray = array.slice(0, window.constants.NUMBER_OF_PINS_ON_MAP);
        map.appendChild(window.getPinsFragment(slicedArray));
      } else {
        map.appendChild(window.getPinsFragment(array));
      }
    },
    clear: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (element) {
        element.remove();
      });
    }};

})();
