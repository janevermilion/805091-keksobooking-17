'use strict';
(function () {
  var map = document.querySelector('.map');
  var filterForm = document.querySelector('.map__filters');

  window.mapClickHandler = function () {
    var target = event.target;
    var popup = document.querySelector('.popup');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    while (target !== map) {
      if (target === popup) {
        return;
      }
      if (target === filterForm) {
        window.closePopupNow(map);
        return;
      }
      pins.forEach(function (currentPin) {
        if (target === currentPin) {
          var indexOfCurrentPin = window.pinsData.findIndex(function (element) {
            var pinImg = currentPin.querySelector('img');
            return element.offer.title === pinImg.alt;
          });
          window.closePopupNow(map);
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
