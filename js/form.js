'use strict';

(() => {

  // Найдём инпуты для гостей и комнат
  const selectRoom = document.querySelector(`#room_number`);
  const selectGuest = document.querySelector(`#capacity`);
  // Проверяем сразу при загрузке страницы
  if (selectRoom.value < selectGuest.value) {
    selectRoom.setCustomValidity(window.const.NOT_VALID_REPORT);
  }

  // Слушаем изменнения в комнатах
  selectRoom.addEventListener(`change`, () => {
    const roomsCount = Number(selectRoom.value);
    const guestCount = Number(selectGuest.value);
    if (roomsCount === 2 && roomsCount < guestCount) {
      selectRoom.setCustomValidity(window.const.NOT_VALID_REPORT);
    } else if (roomsCount === 100) {
      selectGuest.value = 0;
    } else if (guestCount === 0 && roomsCount !== 100) {
      selectGuest.setCustomValidity(`Здесь нельзя разместить гостей`);
    } else {
      selectGuest.setCustomValidity(``);
    }
    selectRoom.setCustomValidity(guestCount > roomsCount ? window.const.NOT_VALID_REPORT : ``);
  });

  // Слушаем изменнения в гостях
  selectGuest.addEventListener(`change`, () => {
    const roomsCount = Number(selectRoom.value);
    const guestCount = Number(selectGuest.value);
    let validationMessage = ``;

    if (guestCount > roomsCount) {
      validationMessage = window.const.NOT_VALID_REPORT;
    } else if (roomsCount === 100 && guestCount !== 0) {
      validationMessage = `Выбранное количество комнат не для гостей`;
    }

    if (validationMessage === ``) {
      selectRoom.setCustomValidity(``);
    }

    selectGuest.setCustomValidity(validationMessage);
  });

  // Найдём инпуты для типа жилья и цены
  const typeHouse = document.querySelector(`#type`);
  const formPrice = document.querySelector(`#price`);
  // const priceCount = Number(formPrice.value);
  const Price = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  const validPriceHouse = (price, houseValue) => {
    const priceCount = Number(price.value);
    if (houseValue === `flat` && priceCount < Price.FLAT) {
      price.setCustomValidity(`Минимальная цена для квартиры составляет 1000`);
    } else if (houseValue === `house` && priceCount < Price.HOUSE) {
      price.setCustomValidity(`Минимальная цена для дома составляет 5000`);
    } else if (houseValue === `palace` && priceCount < Price.PALACE) {
      price.setCustomValidity(`Минимальная цена для дворца составляет 10000`);
    } else {
      price.setCustomValidity(``);
    }
  };

  typeHouse.addEventListener(`change`, () => {
    if (typeHouse.value === `bungalo`) {
      formPrice.placeholder = Price.BUNGALO;
    } else if (typeHouse.value === `flat`) {
      formPrice.placeholder = Price.FLAT;
    } else if (typeHouse.value === `house`) {
      formPrice.placeholder = Price.HOUSE;
    } else if (typeHouse.value === `palace`) {
      formPrice.placeholder = Price.PALACE;
    }

    validPriceHouse(formPrice, typeHouse.value);
  });

  formPrice.addEventListener(`change`, () => {
    validPriceHouse(formPrice, typeHouse.value);
  });

  // Найдём инпуты для времени заезда\выезда
  const timeIn = document.querySelector(`#timein`);
  const timeOut = document.querySelector(`#timeout`);

  timeIn.addEventListener(`change`, () => {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener(`change`, () => {
    timeIn.value = timeOut.value;
  });

  const CoordStart = {
    X: 570,
    Y: 375
  };

  const form = document.querySelector(`.ad-form`);
  const mainButton = document.querySelector(`.map__pin--main`);
  const resetButton = document.querySelector(`.ad-form__reset`);
  const formAddress = document.querySelector(`#address`);
  // Находим элементы формы
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const formHeader = document.querySelector(`.ad-form-header`);
  const formElements = document.querySelectorAll(`.ad-form__element`);
  const houseFeature = document.querySelector(`#housing-features`);
  const mapList = document.querySelector(`.map`);

  const reboot = () => {
    window.util.addShutdown([houseFeature, formHeader, ...mapFilters, ...formElements], true);
    mapList.classList.add(`map--faded`);
    form.reset();
    window.pin.deleteMark(`.map__pin`);
    const mapCard = document.querySelector(`.map__card`);
    if (mapCard) {
      mapCard.remove();
    }
    form.classList.add(`ad-form--disabled`);
  };

  const onResetButtonClick = (evt) => {
    evt.preventDefault();
    reboot();
    mainButton.style.left = `${CoordStart.X}px`;
    mainButton.style.top = `${CoordStart.Y}px`;
    formAddress.value = window.util.findAdress(mainButton);
    resetButton.removeEventListener(`click`, onResetButtonClick);
    mainButton.addEventListener(`click`, window.main.onMainButtonClick);
  };
  resetButton.addEventListener(`click`, onResetButtonClick);

  window.form = {
    reboot
  };
})();
