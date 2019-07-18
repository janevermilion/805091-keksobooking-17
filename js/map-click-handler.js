'use strict';
(function () {
  var map = document.querySelector('.map');
  window.mapClickHandler = function () {
    var target = event.target;
    var popup = document.querySelector('.popup');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (map.querySelector('.popup')) {
      var lastActivePin = map.querySelector('.map__pin--active');
      lastActivePin.classList.remove('map__pin--active');
      map.removeChild(popup);
    }
    while (target !== map) {
      if (target === popup) {
        return;
      }
      pins.forEach(function (currentPin) {
        if (target === currentPin) {
          var indexOfCurrentPin = window.pinsData.findIndex(function (element) {
            var pinImg = currentPin.querySelector('img');
            return element.offer.title === pinImg.alt;
          });
          map.appendChild(window.createNewListingPopup(window.pinsData[indexOfCurrentPin]));
          window.addCloseHandlersToPopup(currentPin);
          currentPin.classList.add('map__pin--active');
          return;
        }
      });
      target = target.parentNode;
    }
  };
})();
