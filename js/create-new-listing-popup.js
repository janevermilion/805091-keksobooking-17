'use strict';

(function () {

  var getTypeOnRussian = function (array, value) {
    var element = array.filter(function (item) {
      return item.type === value;
    });
    return element[0].russian;
  };

  var filterFeatures = function (dataToFilter, dataOfFeatures) {
    var newData = [];
    dataOfFeatures.forEach(function (tag) {
      for (var i = 0; i < dataToFilter.length; i++) {
        var element = dataToFilter[i];
        if (element.classList.contains('popup__feature--' + tag)) {
          newData.push(element);
        }
      }
    });
    return newData;
  };

  var renderFeatures = function (dataToFilter, dataOfFeatures, container) {
    if (dataOfFeatures.length === dataToFilter.length) {
      return container;
    }
    var newFragmentOfFeatures = filterFeatures(dataToFilter, dataOfFeatures);
    dataToFilter.forEach(function (element) {
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


  window.createNewListingPopup = function (data) {

    var templateListing = document.querySelector('#card').content.querySelector('.popup');
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
    var popupClose = newPopup.querySelector('.popup__close');

    popupAvatar.src = data.author.avatar;
    popupTitle.textContent = data.offer.title;
    popupAddress.textContent = data.offer.address;
    popupPrice.textContent = (data.offer.price) + '₽/ночь';
    popupType.textContent = getTypeOnRussian(window.constants.AccomodationType, data.offer.type);
    popupCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей.';
    popupTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    renderFeatures(featuresList, data.offer.features, popupFeaturesContainer);
    popupDescription.textContent = data.description;
    renderPhotos(popupPhotosContainer, data.offer.photos, newPopup);

    var popupKeydownHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        var addedPopup = document.querySelector('.popup');
        popupClose.removeEventListener('click', buttonClosePopupHandler);
        document.removeEventListener('keydown', popupKeydownHandler);

        addedPopup.parentNode.removeChild(addedPopup);
      }
    };
    var buttonClosePopupHandler = function () {
      var addedPopup = document.querySelector('.popup');
      popupClose.removeEventListener('click', buttonClosePopupHandler);
      document.removeEventListener('keydown', popupKeydownHandler);

      addedPopup.parentNode.removeChild(addedPopup);
    };

    popupClose.addEventListener('click', buttonClosePopupHandler);
    document.addEventListener('keydown', popupKeydownHandler);

    return newPopup;
  };

})();

