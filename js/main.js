'use strict';

(() => {

  const mainButton = document.querySelector(`.map__pin--main`);

  const onMainButtonClick = () => {
    window.map.activateMap();

    window.load((adverts) => {
      window.pin.renderPins(adverts);
      window.main.arrayAdverts = adverts;
    });
    mainButton.removeEventListener(`click`, onMainButtonClick);
  };

  const form = document.querySelector(`.ad-form`);

  form.addEventListener(`submit`, (evt) => {
    window.upload(new FormData(form), () => {
      window.form.reboot();
      mainButton.addEventListener(`click`, onMainButtonClick);
    });
    evt.preventDefault();
  });

  // Активируем карту
  mainButton.addEventListener(`click`, onMainButtonClick);

  window.main = {
    onMainButtonClick
  };
})();

