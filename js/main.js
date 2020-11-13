'use strict';

(() => {

  const mainButton = document.querySelector(`.map__pin--main`);
  const mapFilters = document.querySelector(`.map__filters`);
  const house = mapFilters.querySelector(`#housing-type`);
  let arrayAdverts = [];

  const onMainButtonClick = () => {
    window.map.activateMap();

    window.load((adverts) => {
      window.pin.renderPins(adverts);
      arrayAdverts = adverts;
    });
    mainButton.removeEventListener(`click`, onMainButtonClick);
  };

  house.addEventListener(`change`, () => {
    const newAdverts = window.filter.houseType(arrayAdverts);
    const mapCard = document.querySelector(`.map__card`);
    window.pin.deleteMarks(`.map__pin`);
    if (house.value !== `any`) {
      window.pin.renderPins(newAdverts);
    } else {
      window.pin.renderPins(arrayAdverts);
    }
    if (mapCard) {
      mapCard.remove();
    }
  });

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

