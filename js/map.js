'use strict';

// создаем переменную с элементом, куда копировать
const mapList = document.querySelector(`.map`);

// Находим элементы формы
const mapFilters = document.querySelectorAll(`.map__filter`);
const formHeader = document.querySelector(`.ad-form-header`);
const formElements = document.querySelectorAll(`.ad-form__element`);
const houseFeature = document.querySelector(`#housing-features`);
const formMain = document.querySelector(`.ad-form`);

// ! добавление disabled
window.util.addShutdown([houseFeature, formHeader, ...mapFilters, ...formElements], true);

// Функция активации карты
const activateMap = () => {
  window.util.addShutdown([houseFeature, formHeader, ...mapFilters, ...formElements], false);
  mapList.classList.remove(`map--faded`);
  formMain.classList.remove(`ad-form--disabled`);
};

const mainButton = document.querySelector(`.map__pin--main`);
const formAddress = document.querySelector(`#address`);

formAddress.value = window.util.findAdress(mainButton);

window.map = {
  activateMap
};
