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

  const deleteMarks = (className) => {
    document.querySelectorAll(className).forEach((pin) => {
      if (!pin.classList.contains(`map__pin--main`)) {
        pin.remove();
      }
    });
  };

  const MAX_RENDERING_ADVERTS = 5;
  const renderPins = (adverts) => {
    const fragment = document.createDocumentFragment();
    const mapListElement = document.querySelector(`.map__pins`);

    const advertsLengths = adverts.length >= MAX_RENDERING_ADVERTS ? MAX_RENDERING_ADVERTS : adverts.length;

    for (let i = 0; i < advertsLengths; i++) {
      fragment.appendChild(window.pin.renderPin(adverts[i]));
    }
    mapListElement.appendChild(fragment);
  };

  window.pin = {
    renderPin,
    deleteMarks,
    renderPins
  };
})();


