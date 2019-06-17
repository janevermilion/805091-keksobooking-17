'use strict';
var map = document.querySelector('.map');
var screenWidth = document.documentElement.clientWidth;
var NUMBER_OF_LOCATIONS = 8;
var types = ['palace', 'flat', 'house', 'bungalo'];
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var WIDTH_OF_PIN = 50;
var HEIGHT_OF_PIN = 70;
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
var adresses = getAvatarAdresses(NUMBER_OF_LOCATIONS);
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
    var newObject = createObject(adresses[i], types[getRandomNumber(0, types.length - 1)], getRandomNumber(0, screenWidth), getRandomNumber(130, 630));
    objectsArray.push(newObject);
  }
  return objectsArray;
};
var pinsData = getObjectsArray(NUMBER_OF_LOCATIONS);
var getNewPin = function (currentData) {
  var newPin = templatePin.cloneNode(true);
  newPin.style.left = (currentData.location.x + WIDTH_OF_PIN / 2) + 'px';
  newPin.style.top = (currentData.location.y - HEIGHT_OF_PIN) + 'px';
  var pinImg = newPin.querySelector('img');
  pinImg.alt = currentData.offer;
  pinImg.src = currentData.author;
  return newPin;
};
var getPinsFragment = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var readyPin = getNewPin(array[i]);
    fragment.appendChild(readyPin);
  }
  return fragment;
};
var pinsFragment = getPinsFragment(pinsData);

var startPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var filtersForm = document.querySelector('.map__filters');

var findChildren = function (parent, selectors) {
  var childList = parent.querySelectorAll(selectors);
  return childList;
};
var adFormFieldsetList = findChildren(adForm, 'fieldset');

var addDisableAttr = function (list) {
  for (var i = 0; i < list.length; i++) {
    list[i].disabled = true;
  }
};

addDisableAttr(adFormFieldsetList);
var filtersFormChildrenList = findChildren(filtersForm, 'fieldset, select');
addDisableAttr(filtersFormChildrenList);
var deleteDisableAttr = function (list) {
  for (var i = 0; i < list.length; i++) {
    list[i].disabled = false;
  }
};
var pinOpenMapHandler = function () {
  map.classList.remove('map--faded');
  map.appendChild(pinsFragment);
  adForm.classList.remove('ad-form--disabled');
  deleteDisableAttr(adFormFieldsetList);
  deleteDisableAttr(filtersFormChildrenList);
  resetFormButton.addEventListener('click', formClearHandler);
  startPin.removeEventListener('click', pinOpenMapHandler);
};

startPin.addEventListener('click', pinOpenMapHandler);

var HEIGHT_OF_START_PIN = 84;
var WIDTH_OF_START_PIN = 62;
var MAP_WIDTH = 704;

var getCoordinatesOfPin = function (mapWidth, mapHeight, pinWidth, pinHeight) {
  var coordinates = {};
  coordinates.x = mapWidth / 2 - pinWidth / 2;
  coordinates.y = mapHeight / 2 - pinHeight / 2;
  return coordinates;
};
var сoordinatesOfStartPin = getCoordinatesOfPin(screenWidth, MAP_WIDTH, WIDTH_OF_START_PIN, HEIGHT_OF_START_PIN);

var fillAdressInput = function (parent, child) {
  var adressInput = parent.querySelector(child);
  adressInput.value = сoordinatesOfStartPin.x.toString() + ',' + сoordinatesOfStartPin.y.toString();
};

fillAdressInput(adForm, '[name="address"]');
var resetFormButton = adForm.querySelector('.ad-form__reset');
var formClearHandler = function () {
  map.classList.add('map--faded');
  clearPins();
  adForm.classList.add('ad-form--disabled');
  addDisableAttr(adFormFieldsetList);
  addDisableAttr(filtersFormChildrenList);
  startPin.addEventListener('click', pinOpenMapHandler);
  resetFormButton.removeEventListener('click', formClearHandler);
};
var clearPins = function () {
  var pins = document.querySelectorAll('.map__pin');
  for (var i = 1; i < pins.length; i++) {
    pins[i].remove();
  }
};
