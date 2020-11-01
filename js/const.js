'use strict';

(() => {
  const INDEX_MIN = 0;
  const ADVERT = 8;
  const Coordinate = {
    X_MIN: 100,
    X_MAX: 1100,
    Y_MIN: 130,
    Y_MAX: 630
  };
  const Price = {
    MIN: 0,
    MAX: 1000000
  };
  const RoomGuest = {
    MIN: 1,
    MAX: 3,
  };
  const TITLES = [`Заголовок1`, `Заголовок2`, `Заголовок3`];
  const TYPES = [`palace`, `flat`, `house`, `bungalo`];
  const CHECKINS = [`12:00`, `13:00`, `14:00`];
  const CHECKOUTS = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const DESCRIPTIONS = [`описание1`, `описание2`, `описание3`];
  const PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const NOT_VALID_REPORT = `Количество гостей больше, чем количество комнат`;
  const MOUSE_BUTTON = 1;

  window.const = {
    INDEX_MIN,
    ADVERT,
    Coordinate,
    Price,
    RoomGuest,
    TITLES,
    TYPES,
    CHECKINS,
    CHECKOUTS,
    FEATURES,
    DESCRIPTIONS,
    PHOTOS,
    NOT_VALID_REPORT,
    MOUSE_BUTTON
  };
})();
