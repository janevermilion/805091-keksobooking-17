'use strict';
(function () {
  window.addCloseHandlersToPopup = function (pin) {
    var addedPopup = document.querySelector('.popup');
    var popupClose = addedPopup.querySelector('.popup__close');
    var popupKeydownHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        popupClose.removeEventListener('click', buttonClosePopupHandler);
        document.removeEventListener('keydown', popupKeydownHandler);
        pin.classList.remove('map__pin--active');
        addedPopup.parentNode.removeChild(addedPopup);
      }
    };
    var buttonClosePopupHandler = function () {
      popupClose.removeEventListener('click', buttonClosePopupHandler);
      document.removeEventListener('keydown', popupKeydownHandler);
      pin.classList.remove('map__pin--active');
      addedPopup.parentNode.removeChild(addedPopup);
    };
    popupClose.addEventListener('click', buttonClosePopupHandler);
    document.addEventListener('keydown', popupKeydownHandler);
  };
})();
