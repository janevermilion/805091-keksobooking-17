'use strict';
(function () {
  window.closePopupNow = function (parent) {
    if (parent.querySelector('.popup')) {
      var popupChild = parent.querySelector('.popup');
      var lastActivePin = parent.querySelector('.map__pin--active');
      lastActivePin.classList.remove('map__pin--active');
      parent.removeChild(popupChild);
    }
  };
})();
