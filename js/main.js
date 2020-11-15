'use strict';

(() => {

  const mainButton = document.querySelector(`.map__pin--main`);
  const filters = document.querySelector(`.map__filters`);

  let arrayAdverts = [];

  const onMainButtonClick = () => {
    window.map.activateMap();

    window.load((adverts) => {
      window.pin.renderPins(adverts);
      arrayAdverts = adverts;
    });
    mainButton.removeEventListener(`click`, onMainButtonClick);
  };

  filters.addEventListener(`change`, window.filter.getFilters(arrayAdverts));

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

