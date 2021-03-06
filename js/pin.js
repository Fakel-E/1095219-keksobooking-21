'use strict';

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
