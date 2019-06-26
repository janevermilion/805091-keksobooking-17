'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };
  var getAvatarAdresses = function (locations) {
    var listOfAdresses = [];
    for (var i = 1; i <= locations; i++) {
      var avatarAdress = 'img/avatars/user' + '0' + i + '.png';
      listOfAdresses.push(avatarAdress);
    }
    return listOfAdresses;
  };
  var adresses = getAvatarAdresses(window.constants.NUMBER_OF_LOCATIONS);
  var createObject = function (avatar, type, x, y) {
    var object = {};
    object.author = avatar;
    object.offer = type;
    object.location = {
      x: x,
      y: y
    };
    return object;
  };
  var getObjectsArray = function (numberOfLocations) {
    var objectsArray = [];
    for (var i = 0; i < numberOfLocations; i++) {
      var newObject = createObject(adresses[i], window.constants.HOUSING_TYPES[getRandomNumber(0, window.constants.HOUSING_TYPES.length - 1)], getRandomNumber(0, window.constants.MAP_WIDTH), getRandomNumber(window.constants.TOP_BORDER_OF_MAP, window.constants.BOTTOM_BORDER_OF_MAP));
      objectsArray.push(newObject);
    }
    return objectsArray;
  };
  var pinsData = getObjectsArray(window.constants.NUMBER_OF_LOCATIONS);
  var getNewPin = function (currentData) {
    var newPin = templatePin.cloneNode(true);
    newPin.style.left = (currentData.location.x - window.constants.WIDTH_OF_PIN / 2) + 'px';
    newPin.style.top = (currentData.location.y - window.constants.HEIGHT_OF_PIN) + 'px';
    var pinImg = newPin.querySelector('img');
    pinImg.alt = currentData.offer;
    pinImg.src = currentData.author;
    return newPin;
  };
  var getPinsFragment = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var readyPin = getNewPin(data[i]);
      fragment.appendChild(readyPin);
    }
    return fragment;
  };
  window.pinsFragment = getPinsFragment(pinsData);
})();
