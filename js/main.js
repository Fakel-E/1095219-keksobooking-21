'use strict';

const NumberElement = {
  OBJ: 8,
  X: 100,
  XX: 1100,
  Y: 130,
  YY: 630
};
const TITLE_ARR = [`Заголовок1`, `Заголовок2`, `Заголовок3`];
const PRICE_ARR = [`800`, `1000`, `2000`];
const TYPE_ARR = [`palace`, `flat`, `house`, `bungalo`];
const ROOMS_ARR = [`1`, `2`, `3`];
const GUESTS_ARR = [`1`, `2`, `3`];
const CHECKIN_ARR = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_ARR = [`12:00`, `13:00`, `14:00`];
const FEATURES_ARR = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCCRIPTION_ARR = [`описание1`, `описание2`, `описание3`];
const PHOTOS_ARR = [
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
const getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// функиция вызова рандомных елементов
const getRandomElement = function (array) {
  return array[[getRandomInRange(0, array.length - 1)]];
};

// создаём массив объявлений с уникальными характеристиками
const adverts = [];

for (let i = 1; i <= NumberElement.X; i++) {
  const locationX = getRandomInRange(NumberElement.X, NumberElement.XX);
  const locationY = getRandomInRange(NumberElement.Y, NumberElement.YY);
  adverts.push({
    author: {
      avatar: `img/avatars/user0` + i + `.png`
    },
    offer: {
      title: getRandomElement(TITLE_ARR),
      address: locationX + `, ` + locationY,
      price: getRandomElement(PRICE_ARR),
      type: getRandomElement(TYPE_ARR),
      rooms: getRandomElement(ROOMS_ARR),
      guests: getRandomElement(GUESTS_ARR),
      checkin: getRandomElement(CHECKIN_ARR),
      checkout: getRandomElement(CHECKOUT_ARR),
      features: getRandomElement(FEATURES_ARR),
      desccription: getRandomElement(DESCCRIPTION_ARR),
      photos: getRandomElement(PHOTOS_ARR),
    },
    location: {
      x: locationX, // х - ограничено размерами блока
      y: locationY //  y - от 130 до 630
    }
  });
}

// функция отрисовки меток
const renderPin = function (pin) {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector(`img`).src = pin.offer.photos;
  pinElement.querySelector(`img`).alt = pin.offer.title;
  pinElement.style.left = pin.location.x + `px`;
  pinElement.style.top = pin.location.y + `px`;

  return pinElement;
};

// создаем фрагмент дома, который будет добавлять
const fragmentPin = document.createDocumentFragment();
for (let i = 0; i < adverts.length; i++) {
  fragmentPin.appendChild(renderPin(adverts[i]));
}
mapListElement.appendChild(fragmentPin);

mapList.classList.remove(`map--faded`);
