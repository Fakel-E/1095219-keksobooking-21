'use strict';

const mainButton = document.querySelector(`.map__pin--main`);

mainButton.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  const formAddress = document.querySelector(`#address`);
  formAddress.value = window.util.findAdress(mainButton);

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const deltaMove = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainButton.style.top = `${(mainButton.offsetTop - deltaMove.y)}px`;
    mainButton.style.left = `${(mainButton.offsetLeft - deltaMove.x)}px`;

    const postionLeft = parseInt(mainButton.style.left, 10);
    const positionTop = parseInt(mainButton.style.top, 10);

    if (postionLeft <= window.const.StopeMove.X_MIN - window.const.PinSize.X_HALF) {
      mainButton.style.left = `${window.const.StopeMove.X_MIN - window.const.PinSize.X_HALF}px`;
    } else if (postionLeft >= window.const.StopeMove.X_MAX - window.const.PinSize.X_HALF) {
      mainButton.style.left = `${window.const.StopeMove.X_MAX - window.const.PinSize.X_HALF}px`;
    }
    if (positionTop <= window.const.StopeMove.Y_MIN - window.const.PinSize.Y) {
      mainButton.style.top = `${window.const.StopeMove.Y_MIN - window.const.PinSize.Y}px`;

    } else if (positionTop >= window.const.StopeMove.Y_MAX) {
      mainButton.style.top = `${window.const.StopeMove.Y_MAX}px`;
    }

    formAddress.value = window.util.findAdress(mainButton);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
