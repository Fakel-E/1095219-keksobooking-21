'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  window.upload = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    /* xhr.addEventListener('load', () => {
      onSuccess(xhr.response);
    });*/

    xhr.open(`POST`, URL);
    // xhr.send(data);
  };
})();
