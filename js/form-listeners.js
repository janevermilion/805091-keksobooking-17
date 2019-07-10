'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var adFormFieldsetList = adForm.querySelectorAll('fieldset');
  var adressInput = adForm.querySelector('[name="address"]');
  var resetFormButton = adForm.querySelector('.ad-form__reset');


  adressInput.value = (window.constants.MAP_WIDTH / 2 - window.constants.WIDTH_OF_START_PIN / 2) + ',' + (window.constants.MAP_HEIGHT / 2 - window.constants.HEIGHT_OF_START_PIN / 2);
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

  var typeOfHouse = adForm.querySelector('#type');
  var priceForNight = adForm.querySelector('#price');
  var checkInTime = adForm.querySelector('#timein');
  var checkOutTime = adForm.querySelector('#timeout');
  var roomNumber = adForm.querySelector('#room_number');
  var guestsCapacity = adForm.querySelector('#capacity');


  var typeOfHouseSelectHandler = function () {
    var index = typeOfHouse.selectedIndex;
    priceForNight.placeholder = window.constants.MIN_PRICES[index];
    priceForNight.min = window.constants.MIN_PRICES[index];
  };
  var checkInSelectHandler = function () {
    checkOutTime.value = checkInTime.value;
  };
  var checkOutSelectHandler = function () {
    checkInTime.value = checkOutTime.value;
  };


  var validateRoom = function (roomSelect, guestSelect) {
    var guestSelectArr = Array.from(guestSelect);
    var lastValue = roomSelect.length - 1;

    guestSelectArr.forEach(function (numberOfGuests) {
      numberOfGuests.disabled = true;
    });

    guestSelectArr.forEach(function (numberOfGuests) {
      if (roomSelect.value > lastValue) {
        guestSelect[lastValue].disabled = false;
        return;
      }

      if (roomSelect.value === numberOfGuests.value) {
        for (var i = 0; i < lastValue; i++) {
          if (guestSelect[i].value <= numberOfGuests.value) {
            guestSelect[i].disabled = false;
          }
        }
        return;
      }
    });
  };

  var roomNumberChangeHandler = function () {
    validateRoom(roomNumber, guestsCapacity);
  };

  var guestsCapacityChangeHandler = function () {
    validateRoom(roomNumber, guestsCapacity);
  };

  window.formListeners = {
    hide: function () {
      map.classList.add('map--faded');
      window.pinsActions.clear();
      adForm.classList.add('ad-form--disabled');
      addDisableAttr(adFormFieldsetList);
      addDisableAttr(filtersFormChildrenList);
      typeOfHouse.removeEventListener('change', typeOfHouseSelectHandler);
      checkInTime.removeEventListener('change', checkInSelectHandler);
      checkOutTime.removeEventListener('change', checkOutSelectHandler);
      roomNumber.removeEventListener('change', roomNumberChangeHandler);
      guestsCapacity.removeEventListener('change', guestsCapacityChangeHandler);
      mainPin.style.left = (window.constants.MAP_WIDTH / 2 - window.constants.WIDTH_OF_START_PIN / 2) + 'px';
      mainPin.style.top = (window.constants.MAP_HEIGHT / 2 + window.constants.HEIGHT_OF_START_PIN / 2) + 'px';
      adForm.reset();
      adressInput.value = (window.constants.MAP_WIDTH / 2 - window.constants.WIDTH_OF_START_PIN / 2) + ',' + (window.constants.MAP_HEIGHT / 2 - window.constants.HEIGHT_OF_START_PIN / 2);
      resetFormButton.removeEventListener('click', window.formListeners.clear);
    },
    show: function () {
      adForm.classList.remove('ad-form--disabled');
      deleteDisableAttr(adFormFieldsetList);
      deleteDisableAttr(filtersFormChildrenList);
      resetFormButton.addEventListener('click', window.formListeners.hide);
      typeOfHouse.addEventListener('change', typeOfHouseSelectHandler);
      checkInTime.addEventListener('change', checkInSelectHandler);
      checkOutTime.addEventListener('change', checkOutSelectHandler);
      roomNumber.addEventListener('change', roomNumberChangeHandler);
      guestsCapacity.addEventListener('change', guestsCapacityChangeHandler);
    }
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.uploadData(window.createPopup.success, window.createPopup.error, new FormData(adForm));
    window.formListeners.hide();
  });
})();
