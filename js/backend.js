/* global window: false */

let URL_GET = `https://js.dump.academy/code-and-magick/data`;
let URL_POST = `https://js.dump.academy/code-and-magick`;
let TIMEOUT = 5000;

// onSuccess, onError -  функции обратного вызова, указываются при вызове

window.backend = {
  /**
   * Функция получения данных с сервера
   * @param {function} onSuccess - Функция обратного вызова, которая срабатывает при успешном выполнении запроса
   * @param {function} onError - Функция обратного вызова, которая срабатывает при НЕуспешном выполнении запроса
   */
  load(onSuccess, onError) {
    let xhr = createXHR(onSuccess, onError);
    xhr.timeout = TIMEOUT;
    xhr.open(`GET`, URL_GET);
    xhr.send();
  },

  /**
   * Функция для отправки данных на сервер
   * @param {FormData} data - объект FormData, который содержит данные формы, которые будут отправлены на сервер
   * @param {function} onSuccess - Функция обратного вызова, которая срабатывает при успешном выполнении запроса
   * @param {function} onError - Функция обратного вызова, которая срабатывает при НЕуспешном выполнении запроса
   */
  upload(data, onSuccess, onError) {
    // console.log(data);
    let xhr = createXHR(onSuccess, onError);
    xhr.open(`POST`, URL_POST);
    xhr.send(data);
  },
};

/**
 * Функция создания XMLHttpRequest запроса
 * @param {function} onSuccess - Функция обратного вызова, которая срабатывает при успешном выполнении запроса
 * @param {function} onError - Функция обратного вызова, которая срабатывает при НЕуспешном выполнении запроса
 * @return {XMLHttpRequest}
 */
let createXHR = function (onSuccess, onError) {
  let xhr = new window.XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
    } else { // Ошибки сервера
      onError(`Статус ответа сервера: ${xhr.status}  ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соеденения`);
  });

  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполнится за ${xhr.timeout} мс`);
  });
  return xhr;
};


/**
// ------------------------  Тесты

// 1 Вызовем load для проверки
backend.load(console.log, window.utils.onError);

// 2 тест upload
let form = document.querySelector(`.setup-wizard-form`);
form.addEventListener(`submit`, function (evt) {
  backend.upload(new FormData(form), console.log, window.utils.onError);
  evt.preventDefault();
});

let onSuccess = function (data) {
  // действия с полученным json
  console.log(data);
};
*/
