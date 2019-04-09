/* global document: false */

//  Drag and drop - перетаскивание для окна настройки персонажа

(function () {

  let setupDialogElement = document.querySelector(`.setup`);
  let dialogHandler = setupDialogElement.querySelector(`.upload`); // элемент, за который будем перетаскивавать окно

  //  Только при вызове обработчика mousedown - обработчики mousemove и mouseup должны добавляться
  dialogHandler.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = `${setupDialogElement.offsetTop - shift.y}px`;
      setupDialogElement.style.left = `${setupDialogElement.offsetLeft - shift.x}px`;

    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      /**
       * Если на мышку нажали и начали перемещать, то отменяем действие по умолчанию по `click` на элементе (загрузка файла)
       * Иначе по элементу был просто клик, и выполнится действие по умолчанию, назначенное на элемент (загрузка файла)
       */

      if (dragged) {
        let onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandler.addEventListener(`click`, onClickPreventDefault);
      }

    };

    // Обработчик mousemove должен запускать логику изменения положения окна
    document.addEventListener(`mousemove`, onMouseMove);

    // При отпускании кнопки мышки, нужно перестать слушать события `mousemove` и `mouseup`
    document.addEventListener(`mouseup`, onMouseUp);
  });


})();
