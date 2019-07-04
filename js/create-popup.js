'use strict';

(function () {

  var createPopups = function (typeOfPopup) {
    var template = document.querySelector('#' + typeOfPopup).content;
    var newPopup = template.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(newPopup);
    var addedPopup = main.querySelector('.' + typeOfPopup);

    var clickClosePopupHandler = function () {
      main.removeChild(addedPopup);

      document.removeEventListener('click', clickClosePopupHandler);
      document.removeEventListener('keydown', keydownClosePopupHandler);
    };

    var keydownClosePopupHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        main.removeChild(addedPopup);
      }
    };

    document.addEventListener('click', clickClosePopupHandler);
    document.addEventListener('keydown', keydownClosePopupHandler);

    if (typeOfPopup === 'error') {
      var closeButton = document.querySelector('.error__button');
      var closeButtonPopupClosenHandler = function () {
        main.removeChild(addedPopup);
        closeButton.removeEventListener('click', closeButtonPopupClosenHandler);
        document.removeEventListener('click', clickClosePopupHandler);
        document.removeEventListener('keydown', keydownClosePopupHandler);
      };
      closeButton.addEventListener('click', closeButtonPopupClosenHandler);
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
