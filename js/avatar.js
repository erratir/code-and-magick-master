/* global window, document: false */

/**
 * Модуль позволяет менять аватрку пользователя во всплывающем окне
 */
(function () {

  let preview = document.querySelector(`.setup-user-pic`);
  let fileChooser = document.querySelector(`.upload input[type="file"]`);

  fileChooser.addEventListener(`change`, function (evt) {
    evt.preventDefault();
    if (fileChooser.files.length > 0) {
      let file = fileChooser.files[0];
      if (!file.type.match(/image.*/)) {
        // cb(new Error(`FILE_NOT_IMAGE`));
        return;
      }
      preview.src = window.URL.createObjectURL(file);
    }
  });
})();
