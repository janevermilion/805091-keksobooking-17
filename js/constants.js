'use strict';

(function () {
  window.constants = {
    MAP_WIDTH: 1200,
    MAP_HEIGHT: 704,
    NUMBER_OF_LOCATIONS: 8,
    WIDTH_OF_PIN: 50,
    WIDTH_OF_START_PIN: 62,
    HEIGHT_OF_START_PIN: 84,
    HEIGHT_OF_PIN: 70,
    TOP_BORDER_OF_MAP: 130,
    BOTTOM_BORDER_OF_MAP: 630,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    URL_GET: 'https://js.dump.academy/keksobooking/data',
    URL_POST: 'https://js.dump.academy/keksobooking',
    TIMEOUT: 10000,
    DEBOUNCE_INTERVAL: 500,
    NUMBER_OF_PINS_ON_MAP: 5,
    ACCOMODATION_TYPE: [
      {
        'type': 'bungalo',
        'russian': 'Бунгало',
        'minPrice': 0
      },
      {
        'type': 'flat',
        'russian': 'Квартира',
        'minPrice': 1000
      },
      {
        'type': 'house',
        'russian': 'Дом',
        'minPrice': 5000
      },
      {
        'type': 'palace',
        'russian': 'Дворец',
        'minPrice': 10000
      }
    ],
    SUCCESS_XHR_STATUS: 200,
    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],
    DEFAULT_USER_AVATAR: 'img/muffin-grey.svg',
    EXAMPLE_OF_PHOTO_DESCRIPTION: 'Фотография жилья'
  };
})();


