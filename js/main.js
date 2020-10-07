'use strict';

const NumberConst = {
  OBJ: 8,
  X_MIN: 100,
  X_MAX: 1100,
  Y_MIN: 130,
  Y_MAX: 630,
  PRICE_MIN: 0,
  PRICE_MAX: 1000000,
  ROOM_GUEST_MIN: 1,
  ROOM_GUEST_MAX: 3,
  INDEX_MIN: 0
};
const TITLE = [`Заголовок1`, `Заголовок2`, `Заголовок3`];
const TYPE = [`palace`, `flat`, `house`, `bungalo`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCCRIPTION = [`описание1`, `описание2`, `описание3`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

// создаем переменную с элементом, куда копировать
const mapListElement = document.querySelector(`.map__pins`);
const mapList = document.querySelector(`.map`);
// создаем переменные с шаблоном, которые копировать

const pinTemplate = document.querySelector(`#pin`) // метка
    .content
    .querySelector(`.map__pin`);

// функиция вызова рандомных значений
const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// функиция вызова рандомных елементов
const getRandomElement = (array) => {
  return array[[getRandomInRange(0, array.length - 1)]];
};

// функция рандомной сортировки + изменения массива
const mixArray = (massive) => {
  for (let i = massive.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = massive[i];
    massive[i] = massive[j];
    massive[j] = temp;
  }
  massive.splice(NumberConst.INDEX_MIN, getRandomInRange(NumberConst.INDEX_MIN, massive.length - 1));
  return massive;
};

// создаём массив объявлений с уникальными характеристиками
const adverts = [];

const generateAdvert = (massive) => {
  for (let i = 1; i <= NumberConst.OBJ; i++) {
    const locationX = getRandomInRange(NumberConst.X_MIN, NumberConst.X_MAX);
    const locationY = getRandomInRange(NumberConst.Y_MIN, NumberConst.Y_MAX);
    massive.push({
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: getRandomElement(TITLE),
        address: `${locationX}, ${locationY}`,
        price: getRandomInRange(NumberConst.PRICE_MIN, NumberConst.PRICE_MAX),
        type: getRandomElement(TYPE),
        rooms: getRandomInRange(NumberConst.ROOM_GUEST_MIN, NumberConst.ROOM_GUEST_MAX),
        guests: getRandomInRange(NumberConst.ROOM_GUEST_MIN, NumberConst.ROOM_GUEST_MAX),
        checkin: getRandomElement(CHECKIN),
        checkout: getRandomElement(CHECKOUT),
        features: mixArray(FEATURES),
        desccription: getRandomElement(DESCCRIPTION),
        photos: getRandomElement(PHOTOS),
      },
      location: {
        x: locationX, // х - ограничено размерами блока
        y: locationY //  y - от 130 до 630
      }
    });
  }
  return massive;
};


// функция отрисовки меток
const renderPin = function (pin) {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector(`img`).src = pin.offer.photos;
  pinElement.querySelector(`img`).alt = pin.offer.title;
  pinElement.style.left = pin.location.x + `px`;
  pinElement.style.top = pin.location.y + `px`;

  return pinElement;
};

// создаем фрагмент дома, который будет добавлять + генерируем объявления
generateAdvert(adverts);
const fragmentPin = document.createDocumentFragment();
for (let i = 0; i < adverts.length; i++) {
  fragmentPin.appendChild(renderPin(adverts[i]));
}
mapListElement.appendChild(fragmentPin);

mapList.classList.remove(`map--faded`);

