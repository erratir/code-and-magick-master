/* global window, fetch: false */
(function () {

  // в html прописано действие по умолчанию для кнопки сохранить (`.setup-wizard-form`)

  let URLS = {
    GET_DATA: `https://js.dump.academy/code-and-magick/data`,
    POST: `https://js.dump.academy/code-and-magick`,
  };

  window.backend = {
    getData() {
      return fetch(URLS.GET_DATA, {
        method: `get`,
      }).then(function (response) {
        if (response.status !== 200) {
          return null;
        }
        return response.json();
      }).catch(function (error) {
        // TODO Обрботка ошибки
        window.console.log(`Ошибка отправки данных на сервер: ${error.message}. Повторите попытку позже`);
      });
    },
    postData(URL, formData) {
      return fetch(URL, {
        method: `post`,
        body: formData,
      }).then(function (response) {
        if (response.status !== 200) {
          // TODO Всплывающее окно с ошибкой
          window.alert(`Похоже, возникла проблема отправки данных на сервер. \nStatus Code: ${response.status}`);
          // errorPopup(`Looks like there was a problem. Status Code: ${response.status}`);
          return null;
        }
        return response.json();
      }).catch(function (error) {
        // TODO Всплывающее окно с ошибкой
        window.alert(`Ошибка отправки данных на сервер: ${error.message}. Повторите попытку позже`);
      });
    },
  };
})();


// ------------------------  Тесты

// 1 Вызовем getData для проверки
// window.console.log(window.backend.getData());
//
// //  2 тест upload
// let form = document.querySelector(`.setup-wizard-form`);
// form.addEventListener(`submit`, function (evt) {
//   let t = window.backend.postData(`https://js.dump.academy/code-and-magick`, new window.FormData(form));
//   window.console.log(t);
//   evt.preventDefault();
// });

// Пример использования backend.getData()
// PicturesData.prototype.getProperties = function () {
//   var $this = this;
//
//   return new window.Promise(function (resolve, reject) {
//
//     if ($this.isLoaded) {
//       resolve($this.properties);
//       return;
//     }
//
//     window.backend.getData()
//       .then(function (data) {
//         $this.properties = data;
//         $this.isLoaded = true;
//         return $this.properties;
//       })
//       .then(resolve)
//       .catch(reject);
//   });
//
//
// };
