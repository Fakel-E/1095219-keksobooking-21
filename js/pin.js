'use strict';

(() => {

  // создаем переменные с шаблоном, которые копировать
  const pinTemplate = document.querySelector(`#pin`) // метка
  .content
  .querySelector(`.map__pin`);

  // функция отрисовки меток
  const renderPin = (pin) => {
    const pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector(`img`).src = pin.offer.photos;
    pinElement.querySelector(`img`).alt = pin.offer.title;
    pinElement.style.left = pin.location.x + `px`;
    pinElement.style.top = pin.location.y + `px`;

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin,
  };
})();
