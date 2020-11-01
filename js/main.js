'use strict';

// создаем фрагмент дома, который будет добавлять + генерируем объявления
/* const fragmentPin = document.createDocumentFragment();
window.advert.adverts.forEach((item) => fragmentPin.appendChild(window.pin.renderPin(item)));
*/
const mainButton = document.querySelector(`.map__pin--main`);

// Активируем карту
mainButton.addEventListener(`mousedown`, (evt) => {
  // открываем карту по клику
  if (evt.which === window.const.MOUSE_BUTTON) {
    window.map.activateMap();
  }
});

mainButton.addEventListener(`keydown`, (evt) => {
  // открытие по Enter
  if (evt.key === `Enter`) {
    window.map.activateMap();
  }
});

