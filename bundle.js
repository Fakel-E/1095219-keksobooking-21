/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!*********************!*\
  !*** ./js/const.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const NOT_VALID_REPORT = `Количество гостей больше, чем количество комнат`;
const MOUSE_BUTTON = 1;
const MIN_PRICE = `10000`;
const MAX_PRICE = `50000`;
const MAX_RENDERING_ADVERTS = 5;
const Price = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};
const CoordStart = {
  X: 570,
  Y: 375
};
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const STATUS_OK = 200;
const PinSize = {
  X_HALF: 33,
  Y: 65,
  Y_ACTIVATE: 22
};

const StopeMove = {
  X_MIN: 0,
  X_MAX: 1200,
  Y_MIN: 130,
  Y_MAX: 565
};

window.const = {
  NOT_VALID_REPORT,
  MOUSE_BUTTON,
  MIN_PRICE,
  MAX_PRICE,
  MAX_RENDERING_ADVERTS,
  Price,
  CoordStart,
  FILE_TYPES,
  STATUS_OK,
  PinSize,
  StopeMove
};


})();

(() => {
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


// функция создания элементов
const makeElement = (item, itemName) => {
  const element = document.createElement(item);
  element.classList.add(itemName);
  return element;
};

// Возвращение координат
const findAdress = (coordinateElem) => {
  const map = document.querySelector(`.map`);
  let coordinatePin = ``;

  if (map.classList.contains(`map--faded`)) {
    coordinatePin = `${(parseInt(coordinateElem.style.left, 10) + (window.const.PinSize.X_HALF))}, ${(parseInt(coordinateElem.style.top, 10) + window.const.PinSize.Y)}`;
  } else {
    coordinatePin = `${(parseInt(coordinateElem.style.left, 10) + (window.const.PinSize.X_HALF))}, ${(parseInt(coordinateElem.style.top, 10) + window.const.PinSize.Y + window.const.PinSize.Y_ACTIVATE)}`;
  }

  return coordinatePin;
};

// Добавляем disabled на все элементы формы
const addShutdown = (items, isDisabled) => {
  items.forEach((item) => {
    item.disabled = isDisabled;
  });
};

window.util = {
  makeElement,
  findAdress,
  addShutdown
};

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEBOUNCE_INTERVAL = 500; // ms

window.debounce = (cb) => {
  let lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

})();

(() => {
/*!**********************!*\
  !*** ./js/upload.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const URL_SERVER = `https://21.javascript.pages.academy/keksobooking`;
const sendSuccess = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);
const sendError = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);
const mapListElement = document.querySelector(`.map__pins`);

window.upload = (data, onSuccess) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  const removeElem = (elem) => {
    elem.remove();
  };

  xhr.addEventListener(`load`, () => {
    onSuccess(xhr.response);
    if (xhr.status === window.const.STATUS_OK) {
      const normalSend = sendSuccess.cloneNode(true);
      mapListElement.appendChild(normalSend);
      normalSend.addEventListener(`click`, () => {
        removeElem(normalSend);
      });
      document.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Escape`) {
          evt.preventDefault();
          removeElem(normalSend);
        }
      });
    } else {
      const badSend = sendError.cloneNode(true);
      mapListElement.appendChild(badSend);
      badSend.addEventListener(`click`, () => {
        removeElem(badSend);
      });
      document.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Escape`) {
          evt.preventDefault();
          removeElem(badSend);
        }
      });
    }
  });

  xhr.open(`POST`, URL_SERVER);
  xhr.send(data);
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


// создаем переменные с шаблоном, которые копировать
const pinTemplate = document.querySelector(`#pin`) // метка
  .content
  .querySelector(`.map__pin`);

const filterCont = document.querySelector(`.map__filters-container`);
const mapList = document.querySelector(`.map`);

// функция отрисовки меток
const renderMark = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector(`img`).src = pin.author.avatar;
  pinElement.querySelector(`img`).alt = pin.offer.title;
  pinElement.style.left = pin.location.x + `px`;
  pinElement.style.top = pin.location.y + `px`;

  pinElement.addEventListener(`click`, function () {
    mapList.insertBefore(window.advert.renderPopup(pin), filterCont);
  });

  return pinElement;
};

const deleteMarks = () => {
  document
    .querySelectorAll(`.map__pin:not(.map__pin--main)`)
    .forEach((pin) => pin.remove());
};

const renderMarks = (adverts) => {
  const fragment = document.createDocumentFragment();
  const mapListElement = document.querySelector(`.map__pins`);

  const advertsLengths = adverts.length >= window.const.MAX_RENDERING_ADVERTS ? window.const.MAX_RENDERING_ADVERTS : adverts.length;

  for (let i = 0; i < advertsLengths; i++) {
    fragment.appendChild(renderMark(adverts[i]));
  }
  mapListElement.appendChild(fragment);
};

window.pin = {
  mapList,
  filterCont,
  renderMark,
  deleteMarks,
  renderMarks
};

})();

(() => {
/*!**********************!*\
  !*** ./js/advert.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const PopupType = {
  BUNGALO: `bungalo`,
  FLAT: `flat`,
  HOUSE: `house`,
  PALACE: `palace`
};

// создаем переменные с шаблоном, которые копировать
const cardTemplate = document.querySelector(`#card`) // объявление
  .content
  .querySelector(`.map__card`);

const imgTemplate = document.querySelector(`#popup__img`) // фотография
  .content
  .querySelector(`.popup__photo`);

// функция отрисовки объявлений
const renderPopup = (advert) => {
  const popup = cardTemplate.cloneNode(true);
  const imgMain = popup.querySelector(`.popup__photos`);
  const mapCard = document.querySelector(`.map__card`);
  if (mapCard) {
    mapCard.remove();
  }

  popup.querySelector(`.popup__avatar`).src = advert.author.avatar;
  popup.querySelector(`.popup__title`).alt = advert.offer.title;
  popup.querySelector(`.popup__text--address`).textContent = advert.offer.address;
  popup.querySelector(`.popup__text--price`).textContent = `${advert.offer.price} ₽/ночь`;

  if (advert.offer.type === PopupType.PALACE) {
    popup.querySelector(`.popup__type`).textContent = `Дворец`;
  } else if (advert.offer.type === PopupType.FLAT) {
    popup.querySelector(`.popup__type`).textContent = `Квартира`;
  } else if (advert.offer.type === PopupType.BUNGALO) {
    popup.querySelector(`.popup__type`).textContent = `Бунгало`;
  } else if (advert.offer.type === PopupType.HOUSE) {
    popup.querySelector(`.popup__type`).textContent = `Дом`;
  }

  popup.querySelector(`.popup__text--capacity`).textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  popup.querySelector(`.popup__text--time`).textContent = `Заезд после ${advert.offer.checkin}, и выезд до ${advert.offer.checkout}`;

  const featuresUnit = popup.querySelector(`.popup__features`);
  const featureUnits = popup.querySelectorAll(`.popup__feature`);

  featureUnits.forEach((item) => item.parentNode.removeChild(item));

  advert.offer.features.forEach((item) => {
    const featuresElement = window.util.makeElement(`li`, `popup__feature`);
    featuresElement.classList.add(`popup__feature--${item}`);
    featuresUnit.appendChild(featuresElement);
  });

  popup.querySelector(`.popup__description`).textContent = advert.offer.desccription;

  advert.offer.photos.forEach((item) => {
    const imgElement = imgTemplate.cloneNode(true);
    imgElement.src = item;
    imgMain.appendChild(imgElement);
  });

  const closePopup = popup.querySelector(`.popup__close`);
  closePopup.addEventListener(`click`, function () {
    popup.remove();
  });
  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      popup.remove();
    }
  });

  return popup;
};

window.advert = {
  renderPopup,
  PopupType
};

})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



// Находим элементы формы
const filters = document.querySelectorAll(`.map__filter`);
const formHeader = document.querySelector(`.ad-form-header`);
const formElements = document.querySelectorAll(`.ad-form__element`);
const houseFeature = document.querySelector(`#housing-features`);


// ! добавление disabled
window.util.addShutdown([houseFeature, formHeader, ...filters, ...formElements], true);

// Функция активации карты
const activatePage = (element) => {
  window.util.addShutdown([houseFeature, formHeader, ...filters, ...formElements], false);
  window.pin.mapList.classList.remove(`map--faded`);
  window.main.form.classList.remove(`ad-form--disabled`);
  window.form.address.value = window.util.findAdress(element);
};

window.map = {
  activatePage,
  filters,
  formHeader,
  formElements,
  houseFeature
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const selectValue = {
  NIL: 0,
  LOW: 1,
  MIDDLE: 2,
  HIHG: 3,
  MANY: 100
};

// Найдём инпуты для гостей и комнат
const selectRoom = document.querySelector(`#room_number`);
const selectGuest = document.querySelector(`#capacity`);
// Проверяем сразу при загрузке страницы
if (selectRoom.value < selectGuest.value) {
  selectRoom.setCustomValidity(window.const.NOT_VALID_REPORT);
}

const validation = () => {
  const roomsCount = Number(selectRoom.value);
  const guestCount = Number(selectGuest.value);
  let validationMessage = ``;
  if (roomsCount === selectValue.MIDDLE && roomsCount < guestCount) {
    validationMessage = window.const.NOT_VALID_REPORT;
  } else if (guestCount === selectValue.NIL && roomsCount !== selectValue.MANY) {
    validationMessage = `Здесь нельзя разместить гостей`;
  } else if (guestCount > roomsCount) {
    validationMessage = window.const.NOT_VALID_REPORT;
  } else if (roomsCount === selectValue.MANY && guestCount !== selectValue.NIL) {
    validationMessage = `Выбранное количество комнат не для гостей`;
  }

  selectRoom.setCustomValidity(validationMessage);
};

// Слушаем изменнения в комнатах
selectRoom.addEventListener(`change`, () => {
  validation();
});

// Слушаем изменнения в гостях
selectGuest.addEventListener(`change`, () => {
  validation();
});

// Найдём инпуты для типа жилья и цены
const typeHouse = document.querySelector(`#type`);
const formPrice = document.querySelector(`#price`);

const validPriceHouse = (price, houseValue) => {
  const priceCount = Number(price.value);
  if (houseValue === window.advert.FLAT && priceCount < window.const.Price.FLAT) {
    price.setCustomValidity(`Минимальная цена для квартиры составляет 1000`);
  } else if (houseValue === window.advert.HOUSE && priceCount < window.const.Price.HOUSE) {
    price.setCustomValidity(`Минимальная цена для дома составляет 5000`);
  } else if (houseValue === window.advert.PALACE && priceCount < window.const.Price.PALACE) {
    price.setCustomValidity(`Минимальная цена для дворца составляет 10000`);
  } else {
    price.setCustomValidity(``);
  }
};

typeHouse.addEventListener(`change`, () => {
  if (typeHouse.value === window.advert.BUNGALO) {
    formPrice.placeholder = window.const.Price.BUNGALO;
  } else if (typeHouse.value === window.advert.FLAT) {
    formPrice.placeholder = window.const.Price.FLAT;
  } else if (typeHouse.value === window.advert.HOUSE) {
    formPrice.placeholder = window.const.Price.HOUSE;
  } else if (typeHouse.value === window.advert.PALACE) {
    formPrice.placeholder = window.const.Price.PALACE;
  }

  validPriceHouse(formPrice, typeHouse.value);
});

formPrice.addEventListener(`change`, () => {
  validPriceHouse(formPrice, typeHouse.value);
});

// Найдём инпуты для времени заезда\выезда
const timeIn = document.querySelector(`#timein`);
const timeOut = document.querySelector(`#timeout`);

timeIn.addEventListener(`change`, () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener(`change`, () => {
  timeIn.value = timeOut.value;
});

const resetButton = document.querySelector(`.ad-form__reset`);

// загрузка аватара и комнаты

const fileAvatar = document.querySelector(`#avatar`);
const previewAvatar = document.querySelector(`#avatar__preview`);
const imagesHome = document.querySelector(`#images`);
const previewImagesHome = document.querySelector(`.ad-form__photo`);

const getPictureOfUser = (foto, demonstrate) => {
  foto.addEventListener(`change`, () => {
    const file = foto.files[0];
    const fileName = file.name.toLowerCase();

    const matches = window.const.FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        if (demonstrate.matches(`.ad-form__photo`)) {
          const imgPreview = document.createElement(`img`);
          demonstrate.appendChild(imgPreview);
          imgPreview.src = reader.result;
          imgPreview.classList.add(`new-img`);
        } else {
          demonstrate.src = reader.result;
        }
      });

      reader.readAsDataURL(file);
    }
  });
};
getPictureOfUser(fileAvatar, previewAvatar);
getPictureOfUser(imagesHome, previewImagesHome);

const removePictureOfUser = () => {
  previewAvatar.src = `img/muffin-grey.svg`;
  const imgPreview = document.querySelector(`.new-img`);
  imgPreview.remove();
};

const reboot = () => {
  window.util.addShutdown([window.map.houseFeature, window.map.formHeader, ...window.map.filters, ...window.map.formElements], true);
  window.pin.mapList.classList.add(`map--faded`);
  window.main.form.reset();
  window.pin.deleteMarks();
  window.main.keyButton.style.left = `${window.const.CoordStart.X}px`;
  window.main.keyButton.style.top = `${window.const.CoordStart.Y}px`;
  removePictureOfUser();
  const mapCard = document.querySelector(`.map__card`);
  if (mapCard) {
    mapCard.remove();
  }
  window.main.form.classList.add(`ad-form--disabled`);
};

const address = document.querySelector(`#address`);

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  reboot();
  address.value = window.util.findAdress(window.main.keyButton);
  resetButton.removeEventListener(`click`, onResetButtonClick);
  window.main.keyButton.addEventListener(`click`, window.main.onKeyButtonClick);
};
resetButton.addEventListener(`click`, onResetButtonClick);

window.form = {
  reboot,
  address
};

})();

(() => {
/*!********************!*\
  !*** ./js/load.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const URL_SERVER = `https://21.javascript.pages.academy/keksobooking/data`;

const StatusCode = {
  OK: 200
};
const TIMEOUT_IN_MS = 10000;

window.load = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(`GET`, URL_SERVER);
  xhr.send();
};

})();

(() => {
/*!***********************!*\
  !*** ./js/movepin.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const mainButton = document.querySelector(`.map__pin--main`);

mainButton.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  const formAddress = document.querySelector(`#address`);
  formAddress.value = window.util.findAdress(mainButton);

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const deltaMove = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainButton.style.top = `${(mainButton.offsetTop - deltaMove.y)}px`;
    mainButton.style.left = `${(mainButton.offsetLeft - deltaMove.x)}px`;

    const postionLeft = parseInt(mainButton.style.left, 10);
    const positionTop = parseInt(mainButton.style.top, 10);

    if (postionLeft <= window.const.StopeMove.X_MIN - window.const.PinSize.X_HALF) {
      mainButton.style.left = `${window.const.StopeMove.X_MIN - window.const.PinSize.X_HALF}px`;
    } else if (postionLeft >= window.const.StopeMove.X_MAX - window.const.PinSize.X_HALF) {
      mainButton.style.left = `${window.const.StopeMove.X_MAX - window.const.PinSize.X_HALF}px`;
    }
    if (positionTop <= window.const.StopeMove.Y_MIN - window.const.PinSize.Y) {
      mainButton.style.top = `${window.const.StopeMove.Y_MIN - window.const.PinSize.Y}px`;

    } else if (positionTop >= window.const.StopeMove.Y_MAX) {
      mainButton.style.top = `${window.const.StopeMove.Y_MAX}px`;
    }

    formAddress.value = window.util.findAdress(mainButton);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const inputValue = {
  ANY: `any`,
  LOW: `low`,
  MIDDLE: `middle`,
  HIHG: `high`
};

const filters = document.querySelector(`.map__filters-container`);
const houseTypeInput = filters.querySelector(`#housing-type`);
const housePriceInput = filters.querySelector(`#housing-price`);
const houseRoomsInput = filters.querySelector(`#housing-rooms`);
const houseGuestsInput = filters.querySelector(`#housing-guests`);
const houseFeaturesInput = filters.querySelector(`#housing-features`);

const filterAdvertsByHouseType = (type) => houseTypeInput.value === inputValue.ANY || houseTypeInput.value === type;

const filterAdvertsByPrice = (price) => {
  let priceRes = true;
  if (housePriceInput.value !== inputValue.ANY) {
    switch (housePriceInput.value) {
      case inputValue.LOW:
        priceRes = price < window.const.MIN_PRICE;
        break;
      case inputValue.MIDDLE:
        priceRes = price > window.const.MIN_PRICE && price < window.const.MAX_PRICE;
        break;
      case inputValue.HIHG:
        priceRes = price > window.const.MAX_PRICE;
        break;
    }
  }
  return priceRes;
};

const filterAdvertsByRoomsNumber = (rooms) => houseRoomsInput.value === inputValue.ANY || parseInt(houseRoomsInput.value, 10) === rooms;

const filterAdvertsByGuestsNumber = (guests) => houseGuestsInput.value === inputValue.ANY || parseInt(houseGuestsInput.value, 10) === guests;

const filterAdvertsByFeatures = (features) => {
  const featuresElements = houseFeaturesInput.querySelectorAll(`input:checked`);

  for (let featuresElement of featuresElements) {
    if (features.indexOf(featuresElement.value) === -1) {
      return false;
    }
  }

  return true;
};

filters.addEventListener(`change`, window.debounce(() => {
  const card = document.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }

  const filteredData = [];

  for (let item of window.main.arrayAdverts) {
    if (filterAdvertsByHouseType(item.offer.type)
      && filterAdvertsByPrice(item.offer.price)
      && filterAdvertsByRoomsNumber(item.offer.rooms)
      && filterAdvertsByGuestsNumber(item.offer.guests)
      && filterAdvertsByFeatures(item.offer.features)) {
      filteredData.push(item);
    }
    if (filteredData.length === window.const.MAX_RENDERING_ADVERTS) {
      break;
    }
  }

  window.pin.deleteMarks();
  window.pin.renderMarks(filteredData);
}));

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const keyButton = document.querySelector(`.map__pin--main`);

window.form.address.value = window.util.findAdress(keyButton);

const onKeyButtonClick = () => {
  window.map.activatePage(keyButton);

  window.load((adverts) => {
    window.pin.renderMarks(adverts);
    window.main.arrayAdverts = adverts;
  });
  keyButton.removeEventListener(`click`, onKeyButtonClick);
};

const form = document.querySelector(`.ad-form`);

form.addEventListener(`submit`, (evt) => {
  window.upload(new FormData(form), () => {
    window.form.reboot();
    keyButton.addEventListener(`click`, onKeyButtonClick);
  });
  evt.preventDefault();
});

// Активируем карту
keyButton.addEventListener(`click`, onKeyButtonClick);

window.main = {
  onKeyButtonClick,
  keyButton,
  form
};


})();

/******/ })()
;