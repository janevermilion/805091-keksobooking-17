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
let data = '[\n' +
  '  {\n' +
  '    "author": {\n' +
  '      "avatar": "img/avatars/user01.png"\n' +
  '    },\n' +
  '    "offer": {\n' +
  '      "title": "Уютное гнездышко для молодоженов",\n' +
  '      "address": "102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3",\n' +
  '      "price": 42000,\n' +
  '      "type": "house",\n' +
  '      "rooms": 3,\n' +
  '      "guests": 6,\n' +
  '      "checkin": "14:00",\n' +
  '      "checkout": "10:00",\n' +
  '      "features": [\n' +
  '        "wifi",\n' +
  '        "dishwasher",\n' +
  '        "parking",\n' +
  '        "washer",\n' +
  '        "elevator",\n' +
  '        "conditioner"\n' +
  '      ],\n' +
  '      "description": "Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.",\n' +
  '      "photos": [\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_25_b.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_27_b.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_17_b.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_30_b.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_1_b.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_12_b.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_5_b.jpg"\n' +
  '      ]\n' +
  '    },\n' +
  '    "location": {\n' +
  '      "x": 428,\n' +
  '      "y": 493\n' +
  '    }\n' +
  '  },\n' +
  '  {\n' +
  '    "author": {\n' +
  '      "avatar": "img/avatars/user02.png"\n' +
  '    },\n' +
  '    "offer": {\n' +
  '      "title": "Маленькая квартирка рядом с парком",\n' +
  '      "address": "102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō",\n' +
  '      "price": 30000,\n' +
  '      "type": "flat",\n' +
  '      "rooms": 1,\n' +
  '      "guests": 1,\n' +
  '      "checkin": "9:00",\n' +
  '      "checkout": "7:00",\n' +
  '      "features": [\n' +
  '        "elevator",\n' +
  '        "conditioner"\n' +
  '      ],\n' +
  '      "description": "Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.",\n' +
  '      "photos": [\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/01488611-c1f9-4854-ad67-9f0ad3e857e6.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/d976dd4b-2a7e-415a-a2a2-afc51caf8006.jpeg"\n' +
  '      ]\n' +
  '    },\n' +
  '    "location": {\n' +
  '      "x": 471,\n' +
  '      "y": 545\n' +
  '    }\n' +
  '  },\n' +
  '  {\n' +
  '    "author": {\n' +
  '      "avatar": "img/avatars/user03.png"\n' +
  '    },\n' +
  '    "offer": {\n' +
  '      "title": "Небольшая лавочка в парке",\n' +
  '      "address": "Chiyoda-ku, Tōkyō-to 102-0091",\n' +
  '      "price": 100,\n' +
  '      "type": "bungalo",\n' +
  '      "rooms": 0,\n' +
  '      "guests": 0,\n' +
  '      "checkin": "0:00",\n' +
  '      "checkout": "0:00",\n' +
  '      "features": [],\n' +
  '      "description": "Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.",\n' +
  '      "photos": []\n' +
  '    },\n' +
  '    "location": {\n' +
  '      "x": 744,\n' +
  '      "y": 534\n' +
  '    }\n' +
  '  },\n' +
  '  {\n' +
  '    "author": {\n' +
  '      "avatar": "img/avatars/user04.png"\n' +
  '    },\n' +
  '    "offer": {\n' +
  '      "title": "Императорский дворец в центре Токио",\n' +
  '      "address": "1-1 Chiyoda, Chiyoda-ku, Tōkyō-to 100-8111",\n' +
  '      "price": 6000000,\n' +
  '      "type": "house",\n' +
  '      "rooms": 35,\n' +
  '      "guests": 93,\n' +
  '      "checkin": "21:00",\n' +
  '      "checkout": "20:00",\n' +
  '      "features": [\n' +
  '        "wifi",\n' +
  '        "dishwasher",\n' +
  '        "parking",\n' +
  '        "washer",\n' +
  '        "elevator",\n' +
  '        "conditioner"\n' +
  '      ],\n' +
  '      "description": "Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.",\n' +
  '      "photos": [\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/5a29d708-9396-40bf-b002-92c5fdeb5c90.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/23e332cb-1379-4582-85ac-901d6c441635.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/1c859bbf-61d6-4295-b463-c1d0cbf62592.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/f5e66549-1940-4659-b27a-652f5c809231.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_30_b.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/laterooms/hotelphotos/laterooms/274510/gallery/economy-apartment-shinjuku-tokyo-tokyo_040220130219545024.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/laterooms/hotelphotos/laterooms/274510/gallery/economy-apartment-shinjuku-tokyo-tokyo_040220130215449816.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/laterooms/hotelphotos/laterooms/274510/gallery/economy-apartment-shinjuku-tokyo-tokyo_040220130206399539.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/69d53ff8-cd47-479d-8c9a-5170352aa169.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/19614107-a1da-4a0b-8a93-95107704a598.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/a97c72b9-e311-4a5a-863d-ea1e31ae9924.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/d2a52c68-e877-4902-be6d-c7f3cb198437.jpeg"\n' +
  '      ]\n' +
  '    },\n' +
  '    "location": {\n' +
  '      "x": 526,\n' +
  '      "y": 597\n' +
  '    }\n' +
  '  },\n' +
  '  {\n' +
  '    "author": {\n' +
  '      "avatar": "img/avatars/user05.png"\n' +
  '    },\n' +
  '    "offer": {\n' +
  '      "title": "Милейший чердачок",\n' +
  '      "address": "102-0094 Tōkyō-to, Chiyoda-ku, Kioichō, 3",\n' +
  '      "price": 10000,\n' +
  '      "type": "bungalo",\n' +
  '      "rooms": 1,\n' +
  '      "guests": 2,\n' +
  '      "checkin": "11:00",\n' +
  '      "checkout": "10:00",\n' +
  '      "features": [\n' +
  '        "wifi",\n' +
  '        "washer",\n' +
  '        "elevator"\n' +
  '      ],\n' +
  '      "description": "Маленькая квартирка на чердаке. Для самых не требовательных.",\n' +
  '      "photos": [\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/5000000/4500000/4493700/4493658/4493658_17_b.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/b4/c6/b4c674087f12b74bc71fe073923ec744dfe1ed8f.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/1e/e8/1ee854db105a1f6bcd19ea62e1aa294724af7885.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/ca/9a/ca9ad256650553cdce9d8ff8baad93d4f17b9484.jpeg"\n' +
  '      ]\n' +
  '    },\n' +
  '    "location": {\n' +
  '      "x": 361,\n' +
  '      "y": 517\n' +
  '    }\n' +
  '  },\n' +
  '  {\n' +
  '    "author": {\n' +
  '      "avatar": "img/avatars/default.png"\n' +
  '    },\n' +
  '    "offer": {\n' +
  '      "title": "Наркоманский притон",\n' +
  '      "address": "102-0094 Tōkyō-to, Chiyoda-ku, Kioichō, 3",\n' +
  '      "price": 5000,\n' +
  '      "type": "bungalo",\n' +
  '      "rooms": 3,\n' +
  '      "guests": 6,\n' +
  '      "checkin": "11:00",\n' +
  '      "checkout": "10:00",\n' +
  '      "features": [\n' +
  '        "wifi",\n' +
  '        "dishwasher",\n' +
  '        "parking",\n' +
  '        "washer",\n' +
  '        "elevator",\n' +
  '        "conditioner"\n' +
  '      ],\n' +
  '      "description": "У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.",\n' +
  '      "photos": [\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/42624d02-3198-4979-b521-194024454eb7.jpeg"\n' +
  '      ]\n' +
  '    },\n' +
  '    "location": {\n' +
  '      "x": 1165,\n' +
  '      "y": 423\n' +
  '    }\n' +
  '  },\n' +
  '  {\n' +
  '    "author": {\n' +
  '      "avatar": "img/avatars/user06.png"\n' +
  '    },\n' +
  '    "offer": {\n' +
  '      "title": "Чёткая хата",\n' +
  '      "address": "102-0081 Tōkyō-to, Chiyoda-ku, Yonbanchō, 5−6",\n' +
  '      "price": 9000,\n' +
  '      "type": "flat",\n' +
  '      "rooms": 2,\n' +
  '      "guests": 3,\n' +
  '      "checkin": "17:00",\n' +
  '      "checkout": "16:00",\n' +
  '      "features": [\n' +
  '        "dishwasher",\n' +
  '        "parking",\n' +
  '        "washer",\n' +
  '        "elevator",\n' +
  '        "conditioner"\n' +
  '      ],\n' +
  '      "description": "У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!",\n' +
  '      "photos": [\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/a4/bb/a4bbfa3d98c0ddf60e95e610509dbede8160e40e.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/1000000/480000/470500/470466/470466_12_b.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/1000000/480000/470500/470466/470466_17_b.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/aa9f9334-acd2-46f7-ae6e-4ae039376ec6.jpeg"\n' +
  '      ]\n' +
  '    },\n' +
  '    "location": {\n' +
  '      "x": 594,\n' +
  '      "y": 464\n' +
  '    }\n' +
  '  },\n' +
  '  {\n' +
  '    "author": {\n' +
  '      "avatar": "img/avatars/user07.png"\n' +
  '    },\n' +
  '    "offer": {\n' +
  '      "title": "Стандартная квартира в центре",\n' +
  '      "address": "Chiyoda-ku, Tōkyō-to 102-0082",\n' +
  '      "price": 60000,\n' +
  '      "type": "flat",\n' +
  '      "rooms": 3,\n' +
  '      "guests": 5,\n' +
  '      "checkin": "17:00",\n' +
  '      "checkout": "16:00",\n' +
  '      "features": [\n' +
  '        "wifi",\n' +
  '        "dishwasher",\n' +
  '        "washer",\n' +
  '        "conditioner"\n' +
  '      ],\n' +
  '      "description": "Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.",\n' +
  '      "photos": [\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/987935fb-633a-46b8-9b76-76af9f35c5e3.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/434b2eda-5af9-4b93-b97d-4e7514621ff1.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/fa9c3bba-a64a-4019-ab50-102bf6e5d691.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/f779d886-18a6-4ffb-b7c2-f5d4d0c8952a.jpeg"\n' +
  '      ]\n' +
  '    },\n' +
  '    "location": {\n' +
  '      "x": 452,\n' +
  '      "y": 382\n' +
  '    }\n' +
  '  },\n' +
  '  {\n' +
  '    "author": {\n' +
  '      "avatar": "img/avatars/user08.png"\n' +
  '    },\n' +
  '    "offer": {\n' +
  '      "title": "Тихая квартирка недалеко от метро",\n' +
  '      "address": "102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 17−4",\n' +
  '      "price": 50000,\n' +
  '      "type": "flat",\n' +
  '      "rooms": 1,\n' +
  '      "guests": 3,\n' +
  '      "checkin": "23:00",\n' +
  '      "checkout": "5:00",\n' +
  '      "features": [\n' +
  '        "wifi",\n' +
  '        "dishwasher",\n' +
  '        "washer"\n' +
  '      ],\n' +
  '      "description": "Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.",\n' +
  '      "photos": [\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/9b/6c/9b6cacd832ce9f3db3f17b3a2f368958710ce518.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/9c/5d/9c5dc5a6daf5353bb44b5696df1c1186c55173b9.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/cd/c6/cdc6e4a1df6259cb54c75edb6ac351180b49b5ec.jpeg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/abcedd44-bfbd-411d-9919-fa2ac82ef6b0.jpeg"\n' +
  '      ]\n' +
  '    },\n' +
  '    "location": {\n' +
  '      "x": 976,\n' +
  '      "y": 505\n' +
  '    }\n' +
  '  },\n' +
  '  {\n' +
  '    "author": {\n' +
  '      "avatar": "img/avatars/default.png"\n' +
  '    },\n' +
  '    "offer": {\n' +
  '      "title": "Милое гнездышко для фанатов Анимэ",\n' +
  '      "address": "105-0003 Tōkyō-to, Minato-ku, Nishishinbashi, 2 Chome−3",\n' +
  '      "price": 90000,\n' +
  '      "type": "house",\n' +
  '      "rooms": 1,\n' +
  '      "guests": 2,\n' +
  '      "checkin": "23:00",\n' +
  '      "checkout": "5:00",\n' +
  '      "features": [\n' +
  '        "wifi",\n' +
  '        "dishwasher",\n' +
  '        "parking",\n' +
  '        "washer",\n' +
  '        "elevator",\n' +
  '        "conditioner"\n' +
  '      ],\n' +
  '      "description": "Азиатов просьба не беспокоить.",\n' +
  '      "photos": [\n' +
  '        "https://cdn.ostrovok.ru/t/x500/second2/1389653673/9237e4e2ff53d3d1beb69e49412df972.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/second/1389604422/ff530e241de007ce3af7bdd23719ae0a.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/2000000/1480000/1479400/1479346/1479346_34_b.jpg",\n' +
  '        "https://cdn.ostrovok.ru/t/x500/mec/hotels/2000000/1480000/1479400/1479346/1479346_40_b.jpg"\n' +
  '      ]\n' +
  '    },\n' +
  '    "location": {\n' +
  '      "x": 535,\n' +
  '      "y": 418\n' +
  '    }\n' +
  '  }\n' +
  ']\n'
  window.backend = {


    getData: function (callbackSuccess, callbackError) {
      /*var xhr = getXhr(callbackSuccess, callbackError);
      xhr.open('GET', window.constants.URL_GET);
      xhr.send();*/
      callbackSuccess(JSON.parse(data))
    },
    uploadData: function (callbackSuccess, callbackError, data) {
      var xhr = getXhr(callbackSuccess, callbackError);
      xhr.open('POST', window.constants.URL_POST);
      xhr.send(data);
    }
  };

})();
