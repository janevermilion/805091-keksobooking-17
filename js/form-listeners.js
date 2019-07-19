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
  var avatarChooser = document.querySelector('.ad-form__field').querySelector('input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var photoListingChooser = document.querySelector('.ad-form__upload').querySelector('input[type=file]');
  var typeOfHouse = adForm.querySelector('#type');
  var priceForNight = adForm.querySelector('#price');
  var checkInTime = adForm.querySelector('#timein');
  var checkOutTime = adForm.querySelector('#timeout');
  var roomNumber = adForm.querySelector('#room_number');
  var guestsCapacity = adForm.querySelector('#capacity');
  var filterFormChangeHandler = function (evt) {
    var selectedFilter = evt.target;
    window.debounce(function () {
      var filteredData = window.filterData(selectedFilter);
      window.pinsActions.render(filteredData);
    });
  };
  var addDisableAttribute = function (data) {
    data.forEach(function (element) {
      element.disabled = true;
      element.children.disabled = true;
    });
  };
  var deleteDisableAttribute = function (data) {
    data.forEach(function (element) {
      element.disabled = false;
      element.children.disabled = false;
    });
  };
  var cleanPhotosOfListing = function () {
    var data = document.querySelectorAll('.ad-form__photo');
    data.forEach(function (element, i) {
      if (i !== 0) {
        element.parentNode.removeChild(element);
      } else {
        element.innerHTML = '';
      }
    });
  };
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
  priceForNight.placeholder = window.constants.ACCOMODATION_TYPE[typeOfHouse.selectedIndex].minPrice;
  priceForNight.min = window.constants.ACCOMODATION_TYPE[typeOfHouse.selectedIndex].minPrice;
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.uploadData(window.createPopup.success, window.createPopup.error, new FormData(adForm));
    window.formListeners.pageDeactivateHandler();
  });
  adressInput.value = (window.constants.MAP_WIDTH / 2 + window.constants.WIDTH_OF_START_PIN / 2) + ',' + (window.constants.MAP_HEIGHT / 2 + window.constants.HEIGHT_OF_START_PIN);
  addDisableAttribute(adFormFieldsetList);
  window.formListeners = {
    pageDeactivateHandler: function () {
      cleanPhotosOfListing();
      avatarChooser.removeEventListener('change', window.uploadPhoto.avatarChooserUploadHandler);
      photoListingChooser.removeEventListener('change', window.uploadPhoto.photoListingChooserUploadHandler);
      avatarPreview.src = window.constants.DEFAULT_USER_AVATAR;
      filterForm.removeEventListener('change', filterFormChangeHandler);
      window.closePopupNow(map);
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
      resetFormButton.removeEventListener('click', window.formListeners.pageDeactivateHandler);
    },
    pageActivateHandler: function () {
      adForm.classList.remove('ad-form--disabled');
      deleteDisableAttribute(adFormFieldsetList);
      deleteDisableAttribute(filtersFormChildrenList);
      resetFormButton.addEventListener('click', window.formListeners.pageDeactivateHandler);
      typeOfHouse.addEventListener('change', typeOfHouseSelectChangeHandler);
      checkInTime.addEventListener('change', checkInSelectChangeHandler);
      checkOutTime.addEventListener('change', checkOutSelectChangeHandler);
      roomNumber.addEventListener('change', roomNumberChangeHandler);
      map.addEventListener('click', window.mapClickHandler);
      filterForm.addEventListener('change', filterFormChangeHandler);
      avatarChooser.addEventListener('change', window.uploadPhoto.avatarChooserUploadHandler);
      photoListingChooser.addEventListener('change', window.uploadPhoto.photoListingChooserUploadHandler);
      validateRoom(roomNumber, guestsCapacity);
    }
  };
})();
