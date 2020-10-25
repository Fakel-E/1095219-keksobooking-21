'use strict';

const INDEX_MIN = 0;
const ADVERT = 8;
const Coordinate = {
  X_MIN: 100,
  X_MAX: 1100,
  Y_MIN: 130,
  Y_MAX: 630
};
const Price = {
  MIN: 0,
  MAX: 1000000
};
const RoomGuest = {
  MIN: 1,
  MAX: 3,
};
const TITLES = [`Заголовок1`, `Заголовок2`, `Заголовок3`];
const TYPES = [`palace`, `flat`, `house`, `bungalo`];
const CHECKINS = [`12:00`, `13:00`, `14:00`];
const CHECKOUTS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTIONS = [`описание1`, `описание2`, `описание3`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const NOT_VALID_REPORT = `Количество гостей больше, чем количество комнат`;
const MOUSE_BUTTON = 1;

// создаем переменную с элементом, куда копировать
const mapListElement = document.querySelector(`.map__pins`);
const mapList = document.querySelector(`.map`);
// создаем переменные с шаблоном, которые копировать

const pinTemplate = document.querySelector(`#pin`) // метка
    .content
    .querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`) // объявление
    .content
    .querySelector(`.map__card`);

// функиция вызова рандомных значений
const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// функиция вызова рандомных елементов
const getRandomElement = (items) => {
  return items[[getRandomInRange(0, items.length - 1)]];
};

// функция рандомной сортировки + изменения массива
const mixArray = (elements) => {
  for (let i = elements.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = elements[i];
    elements[i] = elements[j];
    elements[j] = temp;
  }
  elements.splice(INDEX_MIN, getRandomInRange(INDEX_MIN, elements.length - 1));
  return elements;
};


const generateAdverts = () => {
  // создаём массив объявлений с уникальными характеристиками
  const ads = [];
  // заполняем массив
  for (let i = 1; i <= ADVERT; i++) {
    const locationX = getRandomInRange(Coordinate.X_MIN, Coordinate.X_MAX);
    const locationY = getRandomInRange(Coordinate.Y_MIN, Coordinate.Y_MAX);
    ads.push({
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: getRandomElement(TITLES),
        address: `${locationX}, ${locationY}`,
        price: getRandomInRange(Price.MIN, Price.MAX),
        type: getRandomElement(TYPES),
        rooms: getRandomInRange(RoomGuest.MIN, RoomGuest.MAX),
        guests: getRandomInRange(RoomGuest.MIN, RoomGuest.MAX),
        checkin: getRandomElement(CHECKINS),
        checkout: getRandomElement(CHECKOUTS),
        features: mixArray(FEATURES),
        desccription: getRandomElement(DESCRIPTIONS),
        photos: getRandomElement(PHOTOS),
      },
      location: {
        x: locationX, // х - ограничено размерами блока
        y: locationY //  y - от 130 до 630
      }
    });
  }
  return ads;
};

const adverts = generateAdverts();

// функция отрисовки меток
const renderPin = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector(`img`).src = pin.offer.photos;
  pinElement.querySelector(`img`).alt = pin.offer.title;
  pinElement.style.left = pin.location.x + `px`;
  pinElement.style.top = pin.location.y + `px`;

  return pinElement;
};

// функция создания элементов
const makeElement = (item, itemName) => {
  const element = document.createElement(item);
  element.classList.add(itemName);
  return element;
};

// функция отрисовки объявлений
const renderAdvert = (advert) => {
  const mapElement = cardTemplate.cloneNode(true);

  mapElement.querySelector(`.popup__avatar`).src = advert.author.avatar;
  mapElement.querySelector(`.popup__title`).alt = advert.offer.title;
  mapElement.querySelector(`.popup__text--address`).textContent = advert.offer.address;
  mapElement.querySelector(`.popup__text--price`).textContent = `${advert.offer.price} ₽/ночь`;

  if (advert.offer.type === `palace`) {
    mapElement.querySelector(`.popup__type`).textContent = `Дворец`;
  } else if (advert.offer.type === `flat`) {
    mapElement.querySelector(`.popup__type`).textContent = `Квартира`;
  } else if (advert.offer.type === `bungalo`) {
    mapElement.querySelector(`.popup__type`).textContent = `Бунгало`;
  } else if (advert.offer.type === `bungalo`) {
    mapElement.querySelector(`.popup__type`).textContent = `Дом`;
  }

  mapElement.querySelector(`.popup__text--capacity`).textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  mapElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${advert.offer.checkin}, и выезд до ${advert.offer.checkout}`;

  const featuresUnit = mapElement.querySelector(`.popup__features`);
  const featureUnits = mapElement.querySelectorAll(`.popup__feature`);

  featureUnits.forEach((item) => item.parentNode.removeChild(item));

  advert.offer.features.forEach((item) => {
    const featuresElement = makeElement(`li`, `popup__feature`);
    featuresElement.classList.add(`popup__feature--${item}`);
    featuresUnit.appendChild(featuresElement);
  });

  mapElement.querySelector(`.popup__description`).textContent = advert.offer.desccription;
  mapElement.querySelector(`.popup__photo`).src = advert.offer.photos;
  return mapElement;
};

// создаем фрагмент дома, который будет добавлять + генерируем объявления
const fragmentPin = document.createDocumentFragment();
adverts.forEach((item) => fragmentPin.appendChild(renderPin(item)));

// создаем фрагмент дома, который будет добавлять
const filter = document.querySelector(`.map__filters-container`);

// Находим элементы формы
const mapFilters = document.querySelectorAll(`.map__filter`);
const formHeader = document.querySelector(`.ad-form-header`);
const formElements = document.querySelectorAll(`.ad-form__element`);
const houseFeature = document.querySelector(`#housing-features`);
const formMain = document.querySelector(`.ad-form`);
// Добавляем disabled на все элементы формы
const addShutdown = (items, isDisabled) => {
  items.forEach((item) => {
    item.disabled = isDisabled;
  });
};

addShutdown([houseFeature, formHeader, ...mapFilters, ...formElements], true);
// ! завершили добавление disabled
// Функция активации карты
const activateMap = () => {
  addShutdown([houseFeature, formHeader, ...mapFilters, ...formElements], false);
  mapList.classList.remove(`map--faded`);
  formMain.classList.remove(`ad-form--disabled`);
  mapListElement.appendChild(fragmentPin);
  mapList.insertBefore(renderAdvert(adverts[0]), filter);
};

const mainButton = document.querySelector(`.map__pin--main`);
const formAddress = document.querySelector(`#address`);

const findAdress = (coordinateElem) => {
  return `${parseInt(coordinateElem.style.left, 10)}, ${parseInt(coordinateElem.style.top, 10)}`;
};
formAddress.value = findAdress(mainButton);
// Активируем карту
mainButton.addEventListener(`mousedown`, (evt) => {
  // открываем карту по клику
  if (evt.which === MOUSE_BUTTON) {
    activateMap();
  }
});

mainButton.addEventListener(`keydown`, (evt) => {
  // открытие по Enter
  if (evt.key === `Enter`) {
    activateMap();
  }
});

// Найдём инпуты для гостей и комнат
const selectRoom = document.querySelector(`#room_number`);
const selectGuest = document.querySelector(`#capacity`);
// Проверяем сразу при загрузке страницы
if (selectRoom.value < selectGuest.value) {
  selectRoom.setCustomValidity(NOT_VALID_REPORT);
}

// Слушаем изменнения в комнатах
selectRoom.addEventListener(`change`, () => {
  const roomsCount = Number(selectRoom.value);
  const guestCount = Number(selectGuest.value);
  if (roomsCount === 1) {
    selectGuest.value = selectRoom.value;
  } else if (roomsCount === 2 && roomsCount < guestCount) {
    selectRoom.setCustomValidity(NOT_VALID_REPORT);
  } else if (roomsCount === 100) {
    selectGuest.value = 0;
  } else if (guestCount === 0 && roomsCount !== 100) {
    selectGuest.setCustomValidity(`Здесь нельзя разместить гостей`);
  } else {
    selectGuest.setCustomValidity(``);
  }
  selectRoom.setCustomValidity(guestCount > roomsCount ? NOT_VALID_REPORT : ``);
});

// Слушаем изменнения в гостях
selectGuest.addEventListener(`change`, () => {
  const roomsCount = Number(selectRoom.value);
  const guestCount = Number(selectGuest.value);
  if (guestCount > roomsCount) {
    selectGuest.setCustomValidity(NOT_VALID_REPORT);
  } else if (roomsCount === 100 && guestCount !== 0) {
    selectGuest.setCustomValidity(`Выбранное количество комнат не для гостей`);
  } else if (guestCount === 0 && roomsCount !== 100) {
    selectGuest.setCustomValidity(`Здесь нельзя разместить гостей`);
  } else {
    selectGuest.setCustomValidity(``);
  }
});

