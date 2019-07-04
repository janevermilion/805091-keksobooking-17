'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  var getNewPin = function (currentData) {
    var newPin = templatePin.cloneNode(true);
    newPin.style.left = (currentData.location.x - window.constants.WIDTH_OF_PIN / 2) + 'px';
    newPin.style.top = (currentData.location.y - window.constants.HEIGHT_OF_PIN) + 'px';
    var pinImg = newPin.querySelector('img');
    pinImg.alt = currentData.title;
    pinImg.src = currentData.author.avatar;
    return newPin;
  };


  window.getPinsFragment = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (element) {
      var readyPin = getNewPin(element);
      fragment.appendChild(readyPin);
    });
    return fragment;
  };

})();

