'use strict';
(function () {


  var getXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.constants.TIMEOUT;
    return xhr;
  };

  window.backend = {
    getData: function (callbackSuccess, callbackError) {
      var xhr = getXhr(callbackSuccess, callbackError);
      xhr.open('GET', window.constants.URL_GET);
      xhr.send();
    },
    uploadData: function (callbackSuccess, callbackError, data) {
      var xhr = getXhr(callbackSuccess, callbackError);
      xhr.open('POST', window.constants.URL_POST);
      xhr.send(data);
    }
  };

})();
