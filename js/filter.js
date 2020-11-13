'use strict';

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const house = mapFilters.querySelector(`#housing-type`);

  const houseType = (pins) => {
    const sameHouseType = pins.filter((it) => {
      return it.offer.type === house.value;
    });
    return sameHouseType;
  };

  window.filter = {
    houseType
  };
})();
