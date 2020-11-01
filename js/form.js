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

})();
