'use strict';

const keyButton = document.querySelector(`.map__pin--main`);

window.form.address.value = window.util.findAdress(keyButton);

const onKeyButtonClick = () => {
  window.map.activatePage(keyButton);

  window.load((adverts) => {
    window.pin.renderMarks(adverts);
    window.main.arrayAdverts = adverts;
  });
  keyButton.removeEventListener(`click`, onKeyButtonClick);
};

const form = document.querySelector(`.ad-form`);

form.addEventListener(`submit`, (evt) => {
  window.upload(new FormData(form), () => {
    window.form.reboot();
    keyButton.addEventListener(`click`, onKeyButtonClick);
  });
  evt.preventDefault();
});

// Активируем карту
keyButton.addEventListener(`click`, onKeyButtonClick);

window.main = {
  onKeyButtonClick,
  keyButton,
  form
};

