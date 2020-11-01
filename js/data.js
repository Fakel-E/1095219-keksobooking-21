'use strict';
(() => {
  const generateAdverts = () => {
    // создаём массив объявлений с уникальными характеристиками
    const ads = [];
    // заполняем массив
    for (let i = 1; i <= window.const.ADVERT; i++) {
      const locationX = window.util.getRandomInRange(window.const.Coordinate.X_MIN, window.const.Coordinate.X_MAX);
      const locationY = window.util.getRandomInRange(window.const.Coordinate.Y_MIN, window.const.Coordinate.Y_MAX);
      ads.push({
        author: {
          avatar: `img/avatars/user0${i}.png`
        },
        offer: {
          title: window.util.getRandomElement(window.const.TITLES),
          address: `${locationX}, ${locationY}`,
          price: window.util.getRandomInRange(window.const.Price.MIN, window.const.Price.MAX),
          type: window.util.getRandomElement(window.const.TYPES),
          rooms: window.util.getRandomInRange(window.const.RoomGuest.MIN, window.const.RoomGuest.MAX),
          guests: window.util.getRandomInRange(window.const.RoomGuest.MIN, window.const.RoomGuest.MAX),
          checkin: window.util.getRandomElement(window.const.CHECKINS),
          checkout: window.util.getRandomElement(window.const.CHECKOUTS),
          features: window.util.mixArray(window.const.FEATURES),
          desccription: window.util.getRandomElement(window.const.DESCRIPTIONS),
          photos: window.util.getRandomElement(window.const.PHOTOS),
        },
        location: {
          x: locationX, // х - ограничено размерами блока
          y: locationY //  y - от 130 до 630
        }
      });
    }
    return ads;
  };

  window.data = {
    generateAdverts,
  };
})();

