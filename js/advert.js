'use strict';

(() => {
  const generateAdverts = () => {
    // создаём массив объявлений с уникальными характеристиками
    const ads = [];
    // заполняем массив
    for (let i = 1; i <= window.const.ADVERT; i++) {
      const locationX = window.util.getRandomInRange(window.const.Coordinate.X_MIN, window.const.Coordinate.X_MAX);
      const locationY = window.util.getRandomInRange(window.const.Coordinate.Y_MIN, window.const.Coordinate.Y_MAX);
      ads.push({
        author: {
          avatar: `img/avatars/user0${i}.png`
        },
        offer: {
          title: window.util.getRandomElement(window.const.TITLES),
          address: `${locationX}, ${locationY}`,
          price: window.util.getRandomInRange(window.const.Price.MIN, window.const.Price.MAX),
          type: window.util.getRandomElement(window.const.TYPES),
          rooms: window.util.getRandomInRange(window.const.RoomGuest.MIN, window.const.RoomGuest.MAX),
          guests: window.util.getRandomInRange(window.const.RoomGuest.MIN, window.const.RoomGuest.MAX),
          checkin: window.util.getRandomElement(window.const.CHECKINS),
          checkout: window.util.getRandomElement(window.const.CHECKOUTS),
          features: window.util.mixArray(window.const.FEATURES),
          desccription: window.util.getRandomElement(window.const.DESCRIPTIONS),
          photos: window.util.getRandomElement(window.const.PHOTOS),
        },
        location: {
          x: locationX, // х - ограничено размерами блока
          y: locationY //  y - от 130 до 630
        }
      });
    }
    return ads;
  };

  // создаем переменные с шаблоном, которые копировать
  const cardTemplate = document.querySelector(`#card`) // объявление
  .content
  .querySelector(`.map__card`);

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
      const featuresElement = window.util.makeElement(`li`, `popup__feature`);
      featuresElement.classList.add(`popup__feature--${item}`);
      featuresUnit.appendChild(featuresElement);
    });

    mapElement.querySelector(`.popup__description`).textContent = advert.offer.desccription;
    mapElement.querySelector(`.popup__photo`).src = advert.offer.photos;
    return mapElement;
  };

  const adverts = generateAdverts();

  window.advert = {
    generateAdverts,
    renderAdvert,
    adverts
  };
})();
