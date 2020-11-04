'use strict';

(() => {

  // создаем переменные с шаблоном, которые копировать
  const pinTemplate = document.querySelector(`#pin`) // метка
  .content
  .querySelector(`.map__pin`);

  const filterCont = document.querySelector(`.map__filters-container`);
  const mapList = document.querySelector(`.map`);

  // функция отрисовки меток
  const renderPin = (pin) => {
    const pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector(`img`).src = pin.author.avatar;
    pinElement.querySelector(`img`).alt = pin.offer.title;
    pinElement.style.left = pin.location.x + `px`;
    pinElement.style.top = pin.location.y + `px`;

    pinElement.addEventListener(`click`, function () {
      mapList.insertBefore(window.advert.renderAdvert(pin), filterCont);
    });

    return pinElement;
  };

  window.pin = {
    renderPin
  };
})();
