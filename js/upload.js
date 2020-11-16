'use strict';

const URL_SERVER = `https://21.javascript.pages.academy/keksobooking/data`;
const sendSuccess = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);
const sendError = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);
const mapListElement = document.querySelector(`.map__pins`);
const STATUS_OK = 200;

window.upload = (data, onSuccess) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  const removeElem = (elem) => {
    elem.remove();
  };

  xhr.addEventListener(`load`, () => {
    onSuccess(xhr.response);
    if (xhr.status === STATUS_OK) {
      const normalSend = sendSuccess.cloneNode(true);
      mapListElement.appendChild(normalSend);
      normalSend.addEventListener(`click`, () => {
        removeElem(normalSend);
      });
      document.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Escape`) {
          evt.preventDefault();
          removeElem(normalSend);
        }
      });
    } else {
      const badSend = sendError.cloneNode(true);
      mapListElement.appendChild(badSend);
      badSend.addEventListener(`click`, () => {
        removeElem(badSend);
      });
      document.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Escape`) {
          evt.preventDefault();
          removeElem(badSend);
        }
      });
    }
  });

  xhr.open(`GET`, URL_SERVER);
  xhr.send(data);
};
