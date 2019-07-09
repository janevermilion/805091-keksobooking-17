'use strict';

(function () {
  var main = document.querySelector('main');
  var createPopups = function (typeOfPopup) {
    var template = document.querySelector('#' + typeOfPopup).content;
    var newPopup = template.cloneNode(true);

    main.appendChild(newPopup);
    var addedPopup = main.querySelector('.' + typeOfPopup);

    var popupClickHandler = function () {
      main.removeChild(addedPopup);

      document.removeEventListener('click', popupClickHandler);
      document.removeEventListener('keydown', popupKeydownHandler);
    };

    var popupKeydownHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        main.removeChild(addedPopup);
      }
    };

    document.addEventListener('click', popupClickHandler);
    document.addEventListener('keydown', popupKeydownHandler);

    if (typeOfPopup === 'error') {
      var closeButton = document.querySelector('.error__button');
      var buttonClosePopupHandler = function () {
        main.removeChild(addedPopup);
        closeButton.removeEventListener('click', buttonClosePopupHandler);
        document.removeEventListener('click', popupClickHandler);
        document.removeEventListener('keydown', popupKeydownHandler);
      };
      closeButton.addEventListener('click', buttonClosePopupHandler);
    }

  };


  window.createPopup = {
    success: function () {
      createPopups('success');
    },
    error: function () {
      createPopups('error');
    }

  };

})();
