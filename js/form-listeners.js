'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var adFormFieldsetList = adForm.querySelectorAll('fieldset');
  var adressInput = adForm.querySelector('[name="address"]');
  var resetFormButton = adForm.querySelector('.ad-form__reset');
  var filterForm = document.querySelector('.map__filters');
  var filtersFormChildrenList = filtersForm.querySelectorAll('fieldset, select');
  var filterFormChangeHandler = function (evt) {
    var selectedFilter = evt.target;
    window.debounce(function () {
      var filteredData = window.filterData(selectedFilter);
      window.pinsActions.render(filteredData);
    });
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.uploadData(window.createPopup.success, window.createPopup.error, new FormData(adForm));
    window.formListeners.hide();
  });
  adressInput.value = (window.constants.MAP_WIDTH / 2 + window.constants.WIDTH_OF_START_PIN / 2) + ',' + (window.constants.MAP_HEIGHT / 2 + window.constants.HEIGHT_OF_START_PIN);
  var addDisableAttribute = function (data) {
    data.forEach(function (element) {
      element.disabled = true;
    });
  };
  var deleteDisableAttribute = function (data) {
    data.forEach(function (element) {
      element.disabled = false;
    });
  };
  var typeOfHouse = adForm.querySelector('#type');
  var priceForNight = adForm.querySelector('#price');
  var checkInTime = adForm.querySelector('#timein');
  var checkOutTime = adForm.querySelector('#timeout');
  var roomNumber = adForm.querySelector('#room_number');
  var guestsCapacity = adForm.querySelector('#capacity');
  priceForNight.placeholder = window.constants.ACCOMODATION_TYPE[typeOfHouse.selectedIndex].minPrice;
  priceForNight.min = window.constants.ACCOMODATION_TYPE[typeOfHouse.selectedIndex].minPrice;
  var typeOfHouseSelectChangeHandler = function () {
    var index = typeOfHouse.selectedIndex;
    priceForNight.placeholder = window.constants.ACCOMODATION_TYPE[index].minPrice;
    priceForNight.min = window.constants.ACCOMODATION_TYPE[index].minPrice;
  };
  var checkInSelectChangeHandler = function () {
    checkOutTime.value = checkInTime.value;
  };
  var checkOutSelectChangeHandler = function () {
    checkInTime.value = checkOutTime.value;
  };
  var validateRoom = function (roomSelect, guestSelect) {
    var guestSelectArray = Array.from(guestSelect);
    var indexOflastValue = roomSelect.length - 1;
    var selectedIndex = roomSelect.selectedIndex;
    var selectedValue = roomSelect.value;
    guestSelectArray.forEach(function (numberOfGuests, i) {
      if (selectedIndex === i && i === indexOflastValue) {
        numberOfGuests.disabled = false;
        numberOfGuests.selected = true;
      } else {
        numberOfGuests.disabled = true;
      }
    });
    var newArray = guestSelectArray.filter(function (item, i) {
      return (i !== indexOflastValue && selectedIndex !== indexOflastValue && item.value < selectedValue) || (i !== indexOflastValue && selectedIndex !== indexOflastValue && item.value === selectedValue);
    });
    if (newArray.length !== 0) {
      newArray.forEach(function (item) {
        item.selected = true;
        item.disabled = false;
      });
    }
  };
  var roomNumberChangeHandler = function () {
    validateRoom(roomNumber, guestsCapacity);
  };
  window.formListeners = {
    hide: function () {
      filterForm.removeEventListener('change', filterFormChangeHandler);
      map.removeEventListener('click', window.mapClickHandler);
      map.classList.add('map--faded');
      window.pinsActions.clear();
      adForm.classList.add('ad-form--disabled');
      addDisableAttribute(adFormFieldsetList);
      addDisableAttribute(filtersFormChildrenList);
      typeOfHouse.removeEventListener('change', typeOfHouseSelectChangeHandler);
      checkInTime.removeEventListener('change', checkInSelectChangeHandler);
      checkOutTime.removeEventListener('change', checkOutSelectChangeHandler);
      roomNumber.removeEventListener('change', roomNumberChangeHandler);
      mainPin.style.left = (window.constants.MAP_WIDTH / 2 - window.constants.WIDTH_OF_START_PIN / 2) + 'px';
      mainPin.style.top = (window.constants.MAP_HEIGHT / 2 + window.constants.HEIGHT_OF_START_PIN / 2) + 'px';
      adForm.reset();
      adressInput.value = (window.constants.MAP_WIDTH / 2 - window.constants.WIDTH_OF_START_PIN / 2) + ',' + (window.constants.MAP_HEIGHT / 2 - window.constants.HEIGHT_OF_START_PIN / 2);
      resetFormButton.removeEventListener('click', window.formListeners.hide);
    },
    show: function () {
      adForm.classList.remove('ad-form--disabled');
      deleteDisableAttribute(adFormFieldsetList);
      deleteDisableAttribute(filtersFormChildrenList);
      resetFormButton.addEventListener('click', window.formListeners.hide);
      typeOfHouse.addEventListener('change', typeOfHouseSelectChangeHandler);
      checkInTime.addEventListener('change', checkInSelectChangeHandler);
      checkOutTime.addEventListener('change', checkOutSelectChangeHandler);
      roomNumber.addEventListener('change', roomNumberChangeHandler);
      map.addEventListener('click', window.mapClickHandler);
      filterForm.addEventListener('change', filterFormChangeHandler);
      validateRoom(roomNumber, guestsCapacity);
    }
  };

})();
