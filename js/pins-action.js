

'use strict';

(function () {

  window.pinsActions = {

    getPinsData: function (arr) {
      window.pinsData = arr;
    },

    render: function (arr) {
      var map = document.querySelector('.map');
      map.appendChild(window.getPinsFragment(arr));

    },
    clear: function () {
      var pins = document.querySelectorAll('.map__pin');
      for (var i = 1; i < pins.length; i++) {
        pins[i].remove();
      }
    }};

})();


