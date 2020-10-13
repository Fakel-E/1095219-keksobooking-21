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
  massive.splice(INDEX_MIN, getRandomInRange(INDEX_MIN, massive.length - 1));
  return massive;
};

const generateAdverts = () => {
  // создаём массив объявлений с уникальными характеристиками
  const adverts = [];

  // заполняем массив
  for (let i = 1; i <= ADVERT; i++) {
    const locationX = getRandomInRange(Coordinate.X_MIN, Coordinate.X_MAX);
    const locationY = getRandomInRange(Coordinate.Y_MIN, Coordinate.Y_MAX);
    adverts.push({
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
  return adverts;
};


// функция отрисовки меток
const renderPin = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector(`img`).src = pin.offer.photos;
  pinElement.querySelector(`img`).alt = pin.offer.title;
  pinElement.style.left = pin.location.x + `px`;
  pinElement.style.top = pin.location.y + `px`;

  return pinElement;
};

// создаем фрагмент дома, который будет добавлять + генерируем объявления
const fragmentPin = document.createDocumentFragment();

generateAdverts().forEach((item) => fragmentPin.appendChild(renderPin(item)));

/* for (let i = 0; i < adverts.length; i++) {
  fragmentPin.appendChild(renderPin(adverts[i]));
}*/
mapListElement.appendChild(fragmentPin);

mapList.classList.remove(`map--faded`);

