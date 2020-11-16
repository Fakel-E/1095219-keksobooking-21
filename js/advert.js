'use strict';

// создаем переменные с шаблоном, которые копировать
const cardTemplate = document.querySelector(`#card`) // объявление
  .content
  .querySelector(`.map__card`);

const imgTemplate = document.querySelector(`#popup__img`) // фотография
  .content
  .querySelector(`.popup__photo`);

// функция отрисовки объявлений
const renderAdvert = (advert) => {
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

  if (advert.offer.type === `palace`) {
    popup.querySelector(`.popup__type`).textContent = `Дворец`;
  } else if (advert.offer.type === `flat`) {
    popup.querySelector(`.popup__type`).textContent = `Квартира`;
  } else if (advert.offer.type === `bungalo`) {
    popup.querySelector(`.popup__type`).textContent = `Бунгало`;
  } else if (advert.offer.type === `bungalo`) {
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
  renderAdvert,
};

