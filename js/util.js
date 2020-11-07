'use strict';

(() => {

  // функиция вызова рандомных значений
  const getRandomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  // функиция вызова рандомных елементов
  const getRandomElement = (items) => {
    return items[[getRandomInRange(0, items.length - 1)]];
  };

  // функция рандомной сортировки + изменения массива
  const mixArray = (elements) => {
    for (let i = elements.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = elements[i];
      elements[i] = elements[j];
      elements[j] = temp;
    }
    elements.splice(window.const.INDEX_MIN, getRandomInRange(window.const.INDEX_MIN, elements.length - 1));
    return elements;
  };

  // функция создания элементов
  const makeElement = (item, itemName) => {
    const element = document.createElement(item);
    element.classList.add(itemName);
    return element;
  };

  // Возвращение координат
  const findAdress = (coordinateElem) => {
    const PinSize = {
      X_HALF: 32.5,
      Y: 65
    };
    const coordinatePin = `${(parseInt(coordinateElem.style.left, 10) + (PinSize.X_HALF))}, ${(parseInt(coordinateElem.style.top, 10) + PinSize.Y)}`;
    return coordinatePin;
  };

  // Добавляем disabled на все элементы формы
  const addShutdown = (items, isDisabled) => {
    items.forEach((item) => {
      item.disabled = isDisabled;
    });
  };

  window.util = {
    getRandomInRange,
    getRandomElement,
    mixArray,
    makeElement,
    findAdress,
    addShutdown
  };
})();
