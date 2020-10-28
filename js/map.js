'use strict';

(() => {

  // создаем переменную с элементом, куда копировать
  const mapListElement = document.querySelector(`.map__pins`);
  const mapList = document.querySelector(`.map`);
  // создаем фрагмент дома, который будет добавлять
  const filter = document.querySelector(`.map__filters-container`);

  // создаем фрагмент дома, который будет добавлять + генерируем метки
  const fragmentPin = document.createDocumentFragment();
  window.advert.adverts.forEach((item) => fragmentPin.appendChild(window.pin.renderPin(item)));

  // Находим элементы формы
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const formHeader = document.querySelector(`.ad-form-header`);
  const formElements = document.querySelectorAll(`.ad-form__element`);
  const houseFeature = document.querySelector(`#housing-features`);
  const formMain = document.querySelector(`.ad-form`);

  window.util.addShutdown([houseFeature, formHeader, ...mapFilters, ...formElements], true);
  // ! завершили добавление disabled
  // Функция активации карты
  const activateMap = () => {
    window.util.addShutdown([houseFeature, formHeader, ...mapFilters, ...formElements], false);
    mapList.classList.remove(`map--faded`);
    formMain.classList.remove(`ad-form--disabled`);
    mapListElement.appendChild(fragmentPin);
    mapList.insertBefore(window.advert.renderAdvert(window.advert.adverts[0]), filter);
  };

  const mainButton = document.querySelector(`.map__pin--main`);
  const formAddress = document.querySelector(`#address`);

  formAddress.value = window.util.findAdress(mainButton);

  window.map = {
    activateMap: activateMap,
  };
})();
