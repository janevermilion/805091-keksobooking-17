'use strict';
(function () {
  var map = document.querySelector('.map__pins');

  var offerCheck = function (data) {
    data.filter(function (element) {
      return element.offer in element;
    });
    return data;
  };

  window.pinsActions = {
    setData: function (data) {
      data = offerCheck(data);
      window.pinsData = data;
    },
    render: function (data) {
      if (data.length > window.constants.NUMBER_OF_PINS_ON_MAP) {
        var sliceddata = data.slice(0, window.constants.NUMBER_OF_PINS_ON_MAP);
        map.appendChild(window.getPinsFragment(sliceddata));
      } else {
        map.appendChild(window.getPinsFragment(data));
      }
    },
    clear: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (element) {
        element.remove();
      });
    }
  };
})();
