'use strict';

const filters = document.querySelector(`.map__filters`);
const houseTypeInput = filters.querySelector(`#housing-type`);
const housePriceInput = filters.querySelector(`#housing-price`);
const houseRoomsInput = filters.querySelector(`#housing-rooms`);
const houseGuestsInput = filters.querySelector(`#housing-guests`);
const houseFeaturesInput = filters.querySelector(`#housing-features`);
const MIN_PRICE = `10000`;
const MAX_PRICE = `50000`;
const MAX_RENDERING_ADVERTS = 5;

const filterAdvertsByHouseType = (type) => houseTypeInput.value === `any` || houseTypeInput.value === type;

const filterAdvertsByPrice = (price) => {
  let priceRes = true;
  if (housePriceInput.value !== `any`) {
    switch (housePriceInput.value) {
      case `low`:
        priceRes = price < MIN_PRICE;
        break;
      case `middle`:
        priceRes = price > MIN_PRICE && price < MAX_PRICE;
        break;
      case `high`:
        priceRes = price > MAX_PRICE;
        break;
    }
  }
  return priceRes;
};

const filterAdvertsByRoomsNumber = (rooms) => houseRoomsInput.value === `any` || parseInt(houseRoomsInput.value, 10) === rooms;

const filterAdvertsByGuestsNumber = (guests) => houseGuestsInput.value === `any` || parseInt(houseGuestsInput.value, 10) === guests;

const filterAdvertsByFeatures = (features) => {
  const featuresElements = houseFeaturesInput.querySelectorAll(`input:checked`);

  for (let featuresElement of featuresElements) {
    if (features.indexOf(featuresElement.value) === -1) {
      return false;
    }
  }

  return true;
};

filters.addEventListener(`change`, window.debounce(() => {
  const card = document.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }

  const filteredData = window.main.arrayAdverts.filter(
      (item) => {

        return filterAdvertsByHouseType(item.offer.type) && filterAdvertsByPrice(item.offer.price) && filterAdvertsByRoomsNumber(item.offer.rooms) && filterAdvertsByGuestsNumber(item.offer.guests) && filterAdvertsByFeatures(item.offer.features);
      }
  );
  window.pin.deleteMarks();
  window.pin.renderPins(filteredData.slice(0, MAX_RENDERING_ADVERTS));
}));
