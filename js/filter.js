'use strict';

const inputValue = {
  ANY: `any`,
  LOW: `low`,
  MIDDLE: `middle`,
  HIHG: `high`
};

const filters = document.querySelector(`.map__filters-container`);
const houseTypeInput = filters.querySelector(`#housing-type`);
const housePriceInput = filters.querySelector(`#housing-price`);
const houseRoomsInput = filters.querySelector(`#housing-rooms`);
const houseGuestsInput = filters.querySelector(`#housing-guests`);
const houseFeaturesInput = filters.querySelector(`#housing-features`);

const filterAdvertsByHouseType = (type) => houseTypeInput.value === inputValue.ANY || houseTypeInput.value === type;

const filterAdvertsByPrice = (price) => {
  let priceRes = true;
  if (housePriceInput.value !== inputValue.ANY) {
    switch (housePriceInput.value) {
      case inputValue.LOW:
        priceRes = price < window.const.MIN_PRICE;
        break;
      case inputValue.MIDDLE:
        priceRes = price > window.const.MIN_PRICE && price < window.const.MAX_PRICE;
        break;
      case inputValue.HIHG:
        priceRes = price > window.const.MAX_PRICE;
        break;
    }
  }
  return priceRes;
};

const filterAdvertsByRoomsNumber = (rooms) => houseRoomsInput.value === inputValue.ANY || parseInt(houseRoomsInput.value, 10) === rooms;

const filterAdvertsByGuestsNumber = (guests) => houseGuestsInput.value === inputValue.ANY || parseInt(houseGuestsInput.value, 10) === guests;

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

  const filteredData = [];

  for (let item of window.main.arrayAdverts) {
    if (filterAdvertsByHouseType(item.offer.type)
      && filterAdvertsByPrice(item.offer.price)
      && filterAdvertsByRoomsNumber(item.offer.rooms)
      && filterAdvertsByGuestsNumber(item.offer.guests)
      && filterAdvertsByFeatures(item.offer.features)) {
      filteredData.push(item);
    }
    if (filteredData.length === window.const.MAX_RENDERING_ADVERTS) {
      break;
    }
  }

  window.pin.deleteMarks();
  window.pin.renderMarks(filteredData);
}));
