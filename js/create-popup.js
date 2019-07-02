'use strict';

(function () {

  window.createPopup = {
    success: function () {
      var template = document.querySelector('#success').content;
      var newPopup = template.cloneNode(true);
      var main = document.querySelector('main');
      main.appendChild(newPopup);
      var closePopupHandler = function (evt) {
        var addedPopup = main.querySelector('.success');
        if (evt.keyCode === window.constants.ESC_KEYCODE) {
          main.removeChild(addedPopup);
        }

        main.removeChild(addedPopup);

        document.removeEventListener('click', closePopupHandler);
        document.removeEventListener('keydown', closePopupHandler);
      };

      document.addEventListener('click', closePopupHandler);
      document.addEventListener('keydown', closePopupHandler);

    },
    error: function () {
      var template = document.querySelector('#error').content;
      var newPopup = template.cloneNode(true);
      var main = document.querySelector('main');

      main.appendChild(newPopup);
      var closeButton = document.querySelector('.error__button');
      closeButton.addEventListener('click', closePopupHandler);
      var closePopupHandler = function (evt) {
        var addedPopup = main.querySelector('.error');
        if (evt.keyCode === window.constants.ESC_KEYCODE) {
          main.removeChild(addedPopup);
        }

        main.removeChild(addedPopup);

        document.removeEventListener('click', closePopupHandler);
        document.removeEventListener('keydown', closePopupHandler);
      };

      document.addEventListener('click', closePopupHandler);
      document.addEventListener('keydown', closePopupHandler);

    }
  };
})();
