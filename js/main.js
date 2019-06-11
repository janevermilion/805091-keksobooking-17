'use strict';
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var screenWidth = document.documentElement.clientWidth;
var numberOfLocations = 8;
var types = ['palace', 'flat', 'house', 'bungalo'];
var templatePin = document.getElementById('pin').content.querySelector('.map__pin');
var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};
var getAvatarAdresses = function () {
  var listOfAvatars = [];
  for (var i = 1; i <= numberOfLocations; i++) {
    var avatarAdress = 'img/avatars/user' + '0' + i + '.png';
    listOfAvatars.push(avatarAdress);
  }
  return listOfAvatars;
};
var listOfAvatars = getAvatarAdresses();
var createObject = function (avatar, type, x, y) {
  var object = {};
  object.author = avatar;
  object.offer = type;
  object.location = {x,y};//eslint не нравится такая запись

  return object;
};
var getObjectsArray = function () {
  var objects = [];
  for (var i = 0; i < numberOfLocations; i++) {
    var newObject = createObject(listOfAvatars[i], types[getRandomNumber(0, types.length - 1)], getRandomNumber(0, screenWidth), getRandomNumber(130, 630));
    objects.push(newObject)
  }
  return objects;
};
var objects = getObjectsArray();
var addNewPins = function () {
  for (var i = 0; i < numberOfLocations; i++) {
    var newPin = templatePin.cloneNode(true);
    newPin.style.left = (objects[i].location.x - 50) + 'px';
    newPin.style.top = (objects[i].location.y - 70) + 'px';
    var pinImg = newPin.getElementsByTagName('img')[0];
    pinImg.alt = objects[i].offer;
    pinImg.src = objects[i].author;
    map.appendChild(newPin);
  }
};
addNewPins();
