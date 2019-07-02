'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var adFormFieldsetList = adForm.querySelectorAll('fieldset');
  var adressInput = adForm.querySelector('[name="address"]');
  var resetFormButton = adForm.querySelector('.ad-form__reset');
  var housingTypeFilter = document.querySelector('#housing-type');
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
      housingTypeFilter.addEventListener('change', window.housingTypeFiltertHandler);
    }
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.uploadData(new FormData(adForm));
    window.formListeners.hide();
  });
})();
