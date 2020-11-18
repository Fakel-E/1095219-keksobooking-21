'use strict';


// Находим элементы формы
const filters = document.querySelectorAll(`.map__filter`);
const formHeader = document.querySelector(`.ad-form-header`);
const formElements = document.querySelectorAll(`.ad-form__element`);
const houseFeature = document.querySelector(`#housing-features`);


// ! добавление disabled
window.util.addShutdown([houseFeature, formHeader, ...filters, ...formElements], true);

// Функция активации карты
const activatePage = (element) => {
  window.util.addShutdown([houseFeature, formHeader, ...filters, ...formElements], false);
  window.pin.mapList.classList.remove(`map--faded`);
  window.main.form.classList.remove(`ad-form--disabled`);
  window.form.address.value = window.util.findAdress(element);
};

window.map = {
  activatePage,
  filters,
  formHeader,
  formElements,
  houseFeature
};
