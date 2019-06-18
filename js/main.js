'use strict';
var map = document.querySelector('.map');
var screenWidth = 1200;
var NUMBER_OF_LOCATIONS = 8;
var types = ['bungalo', 'flat', 'house', 'palace'];
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var WIDTH_OF_PIN = 50;
var HEIGHT_OF_PIN = 70;
var HEIGHT_OF_START_PIN = 84;
var WIDTH_OF_START_PIN = 62;
var MAP_HEIGHT = 704;
var MIN_PRICES = ['0', '1000', '5000', '10000'];
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
  newPin.style.left = (currentData.location.x - WIDTH_OF_PIN) + 'px';
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

var startPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var filtersForm = document.querySelector('.map__filters');

var adFormFieldsetList = adForm.querySelectorAll('fieldset');

var addDisableAttr = function (list) {
  for (var i = 0; i < list.length; i++) {
    list[i].disabled = true;
  }
};

addDisableAttr(adFormFieldsetList);
var filtersFormChildrenList = filtersForm.querySelectorAll('fieldset, select');
addDisableAttr(filtersFormChildrenList);

var deleteDisableAttr = function (list) {
  for (var i = 0; i < list.length; i++) {
    list[i].disabled = false;
  }
};

var pinClickHandler = function () {
  map.classList.remove('map--faded');
  var pinsFragment = getPinsFragment(pinsData);
  map.appendChild(pinsFragment);
  adForm.classList.remove('ad-form--disabled');
  deleteDisableAttr(adFormFieldsetList);
  deleteDisableAttr(filtersFormChildrenList);
  resetFormButton.addEventListener('click', formClearHandler);
  typeOfHouse.addEventListener('change', typeOfHouseSelectHandler);
  checkInTime.addEventListener('change', checkInSelectHandler);
  checkOutTime.addEventListener('change', checkOutSelectHandler);
  startPin.removeEventListener('click', pinClickHandler);
};

startPin.addEventListener('click', pinClickHandler);
var adressInput = adForm.querySelector('[name="address"]');
adressInput.value = (screenWidth / 2 - WIDTH_OF_START_PIN / 2).toString() + ' , ' + (MAP_HEIGHT / 2 - HEIGHT_OF_START_PIN / 2).toString();
var resetFormButton = adForm.querySelector('.ad-form__reset');
var formClearHandler = function () {
  map.classList.add('map--faded');
  clearPins();
  adForm.classList.add('ad-form--disabled');
  addDisableAttr(adFormFieldsetList);
  addDisableAttr(filtersFormChildrenList);
  resetFormButton.removeEventListener('click', formClearHandler);
  typeOfHouse.removeEventListener('change', typeOfHouseSelectHandler);
  checkInTime.removeEventListener('change', checkInSelectHandler);
  checkOutTime.removeEventListener('change', checkOutSelectHandler);
  startPin.addEventListener('click', pinClickHandler);

};

var clearPins = function () {
  var pins = document.querySelectorAll('.map__pin');
  for (var i = 1; i < pins.length; i++) {
    pins[i].remove();
  }
};

var typeOfHouse = adForm.querySelector('#type');
var priceForNight = adForm.querySelector('#price');
var checkInTime = adForm.querySelector('#timein');
var checkOutTime = adForm.querySelector('#timeout');
var typeOfHouseSelectHandler = function () {
  var index = typeOfHouse.selectedIndex;
  if (typeOfHouse[index].selected === true) {
    priceForNight.placeholder = MIN_PRICES[index];
    priceForNight.min = MIN_PRICES[index];
  }

};

var checkInSelectHandler = function () {
  checkOutTime.value = checkInTime.value;
};
var checkOutSelectHandler = function () {
  checkInTime.value = checkOutTime.value;
};


