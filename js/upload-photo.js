'use strict';
(function () {
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var avatarChooser = document.querySelector('.ad-form__field').querySelector('input[type=file]');
  var photoListingChooser = document.querySelector('.ad-form__upload').querySelector('input[type=file]');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var placeForPhoto = document.querySelector('.ad-form__photo');
  var uploadAvatar = function (input, uploadContainer) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();
    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        uploadContainer.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };
  var uploadPhotos = function (onSuccess) {
    var file = photoListingChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        onSuccess(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };
  var renderPhoto = function (data) {
    var newImg = document.createElement('img');
    newImg.alt = window.constants.EXAMPLE_OF_PHOTO_DESCRIPTION;
    newImg.classList.add('ad-form__img');
    newImg.src = data;
    newImg.width = placeForPhoto.offsetWidth;
    newImg.height = placeForPhoto.offsetHeight;
    if (!placeForPhoto.querySelector('.ad-form__img')) {
      placeForPhoto.appendChild(newImg);
    } else {
      var newPlaceForPhoto = document.createElement('div');
      newPlaceForPhoto.classList.add('ad-form__photo');
      newPlaceForPhoto.appendChild(newImg);
      photoContainer.appendChild(newPlaceForPhoto);
    }
  };

  window.uploadPhoto = {
    avatarChooserUploadHandler: function () {
      uploadAvatar(avatarChooser, avatarPreview);
    },
    photoListingChooserUploadHandler: function () {
      uploadPhotos(renderPhoto);
    }
  };
})();
