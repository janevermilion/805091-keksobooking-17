'use strict';

(function () {

  var map = document.querySelector('.map');

  window.mapCreatePopupHandler = function (event) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var target = event.target;
    var popup = document.querySelector('.popup');
    while (target !== map) {
      if (target === popup) {
        return;
      }
      pins.forEach(function (currentPin, indexOfCurrentPin) {
        if (target === currentPin) {

          map.appendChild(window.createNewListingPopup(window.pinsData[indexOfCurrentPin]));
          return;
        }

      });
      target = target.parentNode;
    }

  };

})();
