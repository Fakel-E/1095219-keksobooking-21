'use strict';

// функция создания элементов
const makeElement = (item, itemName) => {
  const element = document.createElement(item);
  element.classList.add(itemName);
  return element;
};

// Возвращение координат
const findAdress = (coordinateElem) => {
  const map = document.querySelector(`.map`);
  let coordinatePin = ``;

  if (map.classList.contains(`map--faded`)) {
    coordinatePin = `${(parseInt(coordinateElem.style.left, 10) + (window.const.PinSize.X_HALF))}, ${(parseInt(coordinateElem.style.top, 10) + window.const.PinSize.Y)}`;
  } else {
    coordinatePin = `${(parseInt(coordinateElem.style.left, 10) + (window.const.PinSize.X_HALF))}, ${(parseInt(coordinateElem.style.top, 10) + window.const.PinSize.Y + window.const.PinSize.Y_ACTIVATE)}`;
  }

  return coordinatePin;
};

// Добавляем disabled на все элементы формы
const addShutdown = (items, isDisabled) => {
  items.forEach((item) => {
    item.disabled = isDisabled;
  });
};

window.util = {
  makeElement,
  findAdress,
  addShutdown
};
