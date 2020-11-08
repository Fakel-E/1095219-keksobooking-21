'use strict';

(() => {

  const mainButton = document.querySelector(`.map__pin--main`);
  const mapListElement = document.querySelector(`.map__pins`);
  const filterCont = document.querySelector(`.map__filters-container`);
  const mapList = document.querySelector(`.map`);

  const onMainButtonClick = () => {
    window.map.activateMap();

    window.load((adverts) => {
      // создаем фрагмент дома, который будет добавлят
      const fragment = document.createDocumentFragment();

      adverts.forEach((item) => fragment.appendChild(window.pin.renderPin(item)));
      mapListElement.appendChild(fragment);
      mapList.insertBefore(window.advert.renderAdvert(adverts[0]), filterCont);
    });
    mainButton.removeEventListener(`click`, onMainButtonClick);
  };

  const form = document.querySelector(`.ad-form`);
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const formHeader = document.querySelector(`.ad-form-header`);
  const formElements = document.querySelectorAll(`.ad-form__element`);
  const houseFeature = document.querySelector(`#housing-features`);

  form.addEventListener(`submit`, (evt) => {
    window.upload(new FormData(form), () => {
      window.util.addShutdown([houseFeature, formHeader, ...mapFilters, ...formElements], true);
      form.reset();
      window.pin.deleteMark(`.map__pin`);
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

