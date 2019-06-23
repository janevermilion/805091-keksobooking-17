'use strict';
var MAP_WIDTH = 1200;
var MAP_HEIGHT = 704;
var NUMBER_OF_LOCATIONS = 8;
var WIDTH_OF_PIN = 50;
var WIDTH_OF_START_PIN = 62;
var HEIGHT_OF_START_PIN = 84;
var HEIGHT_OF_PIN = 70;
var MIN_PRICES = ['0', '1000', '5000', '10000'];
var HOUSING_TYPES = ['bungalo', 'flat', 'house', 'palace'];
var map = document.querySelector('.map');
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
    var newObject = createObject(adresses[i], HOUSING_TYPES[getRandomNumber(0, HOUSING_TYPES.length - 1)], getRandomNumber(0, MAP_WIDTH), getRandomNumber(130, 630));
    objectsArray.push(newObject);
  }
  return objectsArray;
};
var pinsData = getObjectsArray(NUMBER_OF_LOCATIONS);
var getNewPin = function (currentData) {
  var newPin = templatePin.cloneNode(true);
  newPin.style.left = (currentData.location.x - WIDTH_OF_PIN / 2) + 'px';
  newPin.style.top = (currentData.location.y - HEIGHT_OF_PIN) + 'px';
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
var mainPin = document.querySelector('.map__pin--main');
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
var adressInput = adForm.querySelector('[name="address"]');
adressInput.value = (MAP_WIDTH / 2 - WIDTH_OF_START_PIN / 2) + ',' + (MAP_HEIGHT / 2 - HEIGHT_OF_START_PIN / 2);
var resetFormButton = adForm.querySelector('.ad-form__reset');
var formClearHandler = function () {
  map.classList.add('map--faded');
  clearPins();
  adForm.classList.add('ad-form--disabled');
  addDisableAttr(adFormFieldsetList);
  addDisableAttr(filtersFormChildrenList);
  typeOfHouse.removeEventListener('change', typeOfHouseSelectHandler);
  checkInTime.removeEventListener('change', checkInSelectHandler);
  checkOutTime.removeEventListener('change', checkOutSelectHandler);
  mainPin.style.left = (MAP_WIDTH / 2 - WIDTH_OF_START_PIN / 2) + 'px';
  mainPin.style.top = (MAP_HEIGHT / 2 + HEIGHT_OF_START_PIN / 2) + 'px';
  adForm.reset();
  resetFormButton.removeEventListener('click', formClearHandler);
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
  priceForNight.placeholder = MIN_PRICES[index];
  priceForNight.min = MIN_PRICES[index];
};
var checkInSelectHandler = function () {
  checkOutTime.value = checkInTime.value;
};
var checkOutSelectHandler = function () {
  checkInTime.value = checkOutTime.value;
};

mainPin.addEventListener('mousedown', function (drugEvt) {
  drugEvt.preventDefault();
  var startCoords = {
    x: drugEvt.clientX,
    y: drugEvt.clientY
  };
  var mainPinMousemoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    mainPin.draggable = true;
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    if ((mainPin.offsetTop - shift.y) > 130 && (mainPin.offsetTop - shift.y) < 630) {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    }
    if ((mainPin.offsetLeft - shift.x) > 0 && (mainPin.offsetLeft - shift.x) < (MAP_WIDTH - WIDTH_OF_START_PIN)) {
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    }
  };
  var mainPinMouseupHander = function (upEvt) {
    upEvt.preventDefault();
    adressInput.value = (mainPin.offsetLeft - WIDTH_OF_START_PIN / 2) + ',' + mainPin.offsetTop;
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
    document.removeEventListener('mousemove', mainPinMousemoveHandler);
    document.removeEventListener('mouseup', mainPinMouseupHander);
  };
  document.addEventListener('mousemove', mainPinMousemoveHandler);
  document.addEventListener('mouseup', mainPinMouseupHander);
});
