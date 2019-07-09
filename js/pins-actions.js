

'use strict';

(function () {


  window.pinsActions = {

    setData: function (data) {
      window.pinsData = data;
    },

    render: function (data) {
      var map = document.querySelector('.map');
      var sliceddata = data.slice(0, window.constants.NUMBER_OF_PINS_ON_MAP);
      map.appendChild(window.getPinsFragment(sliceddata));
    },
    clear: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (element) {
        element.remove();
      });
    }
  };

})();
