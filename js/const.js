'use strict';

const NOT_VALID_REPORT = `Количество гостей больше, чем количество комнат`;
const MOUSE_BUTTON = 1;
const MIN_PRICE = `10000`;
const MAX_PRICE = `50000`;
const MAX_RENDERING_ADVERTS = 5;
const Price = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};
const CoordStart = {
  X: 570,
  Y: 375
};
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const STATUS_OK = 200;
const PinSize = {
  X_HALF: 33,
  Y: 65,
  Y_ACTIVATE: 22
};

const StopeMove = {
  X_MIN: 0,
  X_MAX: 1200,
  Y_MIN: 130,
  Y_MAX: 565
};

window.const = {
  NOT_VALID_REPORT,
  MOUSE_BUTTON,
  MIN_PRICE,
  MAX_PRICE,
  MAX_RENDERING_ADVERTS,
  Price,
  CoordStart,
  FILE_TYPES,
  STATUS_OK,
  PinSize,
  StopeMove
};

