'use strict';
(function () {


  var loadXhr = function (onLoad, onError) {
    window.xhr = new XMLHttpRequest();
    window.xhr.responseType = 'json';

    window.xhr.addEventListener('load', function () {
      if (window.xhr.status === 200) {
        onLoad(window.xhr.response);
      } else {
        onError('Статус ответа: ' + window.xhr.status + ' ' + window.xhr.statusText);
      }
    });
    window.xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    window.xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + window.xhr.timeout + 'мс');
    });

    window.xhr.timeout = window.constants.TIMEOUT;

  };


  window.backend = {
    getData: function (onLoad) {
      loadXhr(window.loadHandlers, window.formListeners.show);
      window.xhr.open('GET', window.constants.URL_GET);
      window.xhr.send();
    },
    uploadData: function (data) {
      loadXhr(window.createPopup.success, window.createPopup.error);
      window.xhr.open('POST', window.constants.URL_POST);
      window.xhr.send(data);
    }
  };


})();

