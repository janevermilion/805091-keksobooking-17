'use strict';
(function () {
  var templateListing = document.querySelector('#card').content.querySelector('.popup');
  var getTypeOnRussian = function (array, value) {
    var type = array.find(function (element) {
      return element.type === value;
    });
    return type.russian;
  };
  var filterFeatures = function (array, values) {
    var newData = [];
    values.forEach(function (tag) {
      for (var i = 0; i < array.length; i++) {
        var element = array[i];
        if (element.classList.contains('popup__feature--' + tag)) {
          newData.push(element);
        }
      }
    });
    return newData;
  };
  var renderFeatures = function (array, values, container) {
    if (values.length === array.length) {
      return container;
    }
    var newFragmentOfFeatures = filterFeatures(array, values);
    array.forEach(function (element) {
      element.parentNode.removeChild(element);
    });
    newFragmentOfFeatures.forEach(function (element) {
      container.appendChild(element);
    });
    return container;
  };
  var renderPhotos = function (container, data, parentPopup) {
    data.forEach(function (src) {
      var popupPhoto = parentPopup.querySelector('.popup__photo');
      var photoTemplate = popupPhoto.cloneNode(true);
      photoTemplate.src = src;
      container.appendChild(photoTemplate);
    });
    container.children[0].parentNode.removeChild(container.children[0]);
  };
  var checkZeroValues = function (container, data1, data2) {
    var zero = 0;
    var zeroTime = '0:00';
    if (data1 === zero || data2 === zero || data1 === zeroTime && data1 === zeroTime) {
      container.textContent = '';
    } else {
      if (container.classList.contains('popup__text--capacity')) {
        container.textContent = data1 + ' комнаты для ' + data2 + ' гостей.';
      }
      if (container.classList.contains('popup__text--time')) {
        container.textContent = 'Заезд после ' + data1 + ', выезд до ' + data2;
      }
    }
  };
  window.createNewListingPopup = function (data) {
    var newPopup = templateListing.cloneNode(true);
    var popupAvatar = newPopup.querySelector('.popup__avatar');
    var popupTitle = newPopup.querySelector('.popup__title');
    var popupAddress = newPopup.querySelector('.popup__text--address');
    var popupPrice = newPopup.querySelector('.popup__text--price');
    var popupType = newPopup.querySelector('.popup__type');
    var popupCapacity = newPopup.querySelector('.popup__text--capacity');
    var popupTime = newPopup.querySelector('.popup__text--time');
    var popupFeaturesContainer = newPopup.querySelector('.popup__features');
    var featuresList = newPopup.querySelectorAll('.popup__feature');
    var popupDescription = newPopup.querySelector('.popup__description');
    var popupPhotosContainer = newPopup.querySelector('.popup__photos');
    popupAvatar.src = data.author.avatar;
    popupTitle.textContent = data.offer.title;
    popupAddress.textContent = data.offer.address;
    popupPrice.textContent = (data.offer.price) + '₽/ночь';
    popupType.textContent = getTypeOnRussian(window.constants.ACCOMODATION_TYPE, data.offer.type);
    checkZeroValues(popupCapacity, data.offer.rooms, data.offer.guests);
    checkZeroValues(popupTime, data.offer.checkin, data.offer.checkout);
    renderFeatures(featuresList, data.offer.features, popupFeaturesContainer);
    popupDescription.innerHTML = data.offer.description;
    renderPhotos(popupPhotosContainer, data.offer.photos, newPopup);
    return newPopup;
  };
})();
