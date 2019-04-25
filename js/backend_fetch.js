/* global window, fetch: false */
(function () {

  // в html прописано действие по умолчанию для кнопки сохранить (`.setup-wizard-form`)

  let URLS = {
    GET_DATA: `https://js.dump.academy/kekstagram/data`,
    POST: `https://js.dump.academy/code-and-magick`,
  };

  window.backend = {
    getData() {
      return fetch(URLS.GET_DATA, {
        method: `get`,
      }).then(function (response) {
        return response.json();
      });
    },

    postData(URL, formData) {
      return fetch(URL, {
        method: `post`,
        body: formData,
      }).then(function (response) {
        return response.json();
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