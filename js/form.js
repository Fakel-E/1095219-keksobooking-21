'use strict';

const selectValue = {
  NIL: 0,
  LOW: 1,
  MIDDLE: 2,
  HIHG: 3,
  MANY: 100
};

// Найдём инпуты для гостей и комнат
const selectRoom = document.querySelector(`#room_number`);
const selectGuest = document.querySelector(`#capacity`);
// Проверяем сразу при загрузке страницы
if (selectRoom.value < selectGuest.value) {
  selectRoom.setCustomValidity(window.const.NOT_VALID_REPORT);
}

const validation = () => {
  const roomsCount = Number(selectRoom.value);
  const guestCount = Number(selectGuest.value);
  let validationMessage = ``;
  if (roomsCount === selectValue.MIDDLE && roomsCount < guestCount) {
    validationMessage = window.const.NOT_VALID_REPORT;
  } else if (guestCount === selectValue.NIL && roomsCount !== selectValue.MANY) {
    validationMessage = `Здесь нельзя разместить гостей`;
  } else if (guestCount > roomsCount) {
    validationMessage = window.const.NOT_VALID_REPORT;
  } else if (roomsCount === selectValue.MANY && guestCount !== selectValue.NIL) {
    validationMessage = `Выбранное количество комнат не для гостей`;
  }

  selectRoom.setCustomValidity(validationMessage);
};

// Слушаем изменнения в комнатах
selectRoom.addEventListener(`change`, () => {
  validation();
});

// Слушаем изменнения в гостях
selectGuest.addEventListener(`change`, () => {
  validation();
});

// Найдём инпуты для типа жилья и цены
const typeHouse = document.querySelector(`#type`);
const formPrice = document.querySelector(`#price`);

const validPriceHouse = (price, houseValue) => {
  const priceCount = Number(price.value);
  if (houseValue === window.advert.FLAT && priceCount < window.const.Price.FLAT) {
    price.setCustomValidity(`Минимальная цена для квартиры составляет 1000`);
  } else if (houseValue === window.advert.HOUSE && priceCount < window.const.Price.HOUSE) {
    price.setCustomValidity(`Минимальная цена для дома составляет 5000`);
  } else if (houseValue === window.advert.PALACE && priceCount < window.const.Price.PALACE) {
    price.setCustomValidity(`Минимальная цена для дворца составляет 10000`);
  } else {
    price.setCustomValidity(``);
  }
};

typeHouse.addEventListener(`change`, () => {
  if (typeHouse.value === window.advert.BUNGALO) {
    formPrice.placeholder = window.const.Price.BUNGALO;
  } else if (typeHouse.value === window.advert.FLAT) {
    formPrice.placeholder = window.const.Price.FLAT;
  } else if (typeHouse.value === window.advert.HOUSE) {
    formPrice.placeholder = window.const.Price.HOUSE;
  } else if (typeHouse.value === window.advert.PALACE) {
    formPrice.placeholder = window.const.Price.PALACE;
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

const resetButton = document.querySelector(`.ad-form__reset`);

// загрузка аватара и комнаты

const fileAvatar = document.querySelector(`#avatar`);
const previewAvatar = document.querySelector(`#avatar__preview`);
const imagesHome = document.querySelector(`#images`);
const previewImagesHome = document.querySelector(`.ad-form__photo`);

const getPictureOfUser = (foto, demonstrate) => {
  foto.addEventListener(`change`, () => {
    const file = foto.files[0];
    const fileName = file.name.toLowerCase();

    const matches = window.const.FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        if (demonstrate.matches(`.ad-form__photo`)) {
          const imgPreview = document.createElement(`img`);
          demonstrate.appendChild(imgPreview);
          imgPreview.src = reader.result;
          imgPreview.classList.add(`new-img`);
        } else {
          demonstrate.src = reader.result;
        }
      });

      reader.readAsDataURL(file);
    }
  });
};
getPictureOfUser(fileAvatar, previewAvatar);
getPictureOfUser(imagesHome, previewImagesHome);

const removePictureOfUser = () => {
  previewAvatar.src = `img/muffin-grey.svg`;
  const imgPreview = document.querySelector(`.new-img`);
  if (imgPreview) {
    imgPreview.remove();
  }
};

const reboot = () => {
  window.util.addShutdown([window.map.houseFeature, window.map.formHeader, ...window.map.filters, ...window.map.formElements], true);
  window.pin.mapList.classList.add(`map--faded`);
  window.main.form.reset();
  window.pin.deleteMarks();
  window.main.keyButton.style.left = `${window.const.CoordStart.X}px`;
  window.main.keyButton.style.top = `${window.const.CoordStart.Y}px`;
  removePictureOfUser();
  const mapCard = document.querySelector(`.map__card`);
  if (mapCard) {
    mapCard.remove();
  }
  window.main.form.classList.add(`ad-form--disabled`);
};

const address = document.querySelector(`#address`);

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  reboot();
  address.value = window.util.findAdress(window.main.keyButton);
  resetButton.removeEventListener(`click`, onResetButtonClick);
  window.main.keyButton.addEventListener(`click`, window.main.onKeyButtonClick);
};
resetButton.addEventListener(`click`, onResetButtonClick);

window.form = {
  reboot,
  address
};
