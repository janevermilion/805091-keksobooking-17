'use strict';

(function () {

  var adressInput = document.querySelector('[name="address"]');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mousedown', function (drugEvt) {
    drugEvt.preventDefault();

    if (map.classList.contains('map--faded')) {
      isMapActive = false;
    } else {
      var isMapActive = true;
    }

    var startCoords = {
      x: drugEvt.clientX,
      y: drugEvt.clientY
    };
    var mainPinMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (newCoords.y > window.constants.TOP_BORDER_OF_MAP - window.constants.HEIGHT_OF_START_PIN / 2 && newCoords.y < window.constants.BOTTOM_BORDER_OF_MAP) {
        mainPin.style.top = newCoords.y + 'px';
      }
      if (newCoords.x > 0 && newCoords.x < (window.constants.MAP_WIDTH - window.constants.WIDTH_OF_START_PIN)) {
        mainPin.style.left = newCoords.x + 'px';
      }
    };
    var mainPinMouseupHander = function (upEvt) {
      upEvt.preventDefault();
      adressInput.value = (mainPin.offsetLeft + window.constants.WIDTH_OF_START_PIN / 2) + ',' + mainPin.offsetTop;

      if (!isMapActive) {
        map.classList.remove('map--faded');
        window.backend.getData(function (dataArray) {
          window.pinsActions.setData(dataArray);
          window.pinsActions.render(dataArray);
        },
        function () {
          window.createPopup.error();
          window.formListeners.show();
        });
        isMapActive = true;
      }
      window.formListeners.show();
      document.removeEventListener('mousemove', mainPinMousemoveHandler);
      document.removeEventListener('mouseup', mainPinMouseupHander);
    };

    document.addEventListener('mousemove', mainPinMousemoveHandler);
    document.addEventListener('mouseup', mainPinMouseupHander);
  });
})();


