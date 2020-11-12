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

