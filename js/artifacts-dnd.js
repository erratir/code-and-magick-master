/* global document: false */

/**
 * Drag and drop для итемов (артефактов) волщебника в окне настройки персонажа)
 *
 * https://developer.mozilla.org/ru/docs/Web/Guide/HTML/Drag_and_drop
 */
(function () {

  let shopElement = document.querySelector(`.setup-artifacts-shop`);
  let draggedItem = null;
  // dragstart - Срабатывает когда элeмент начал перемещаться
  shopElement.addEventListener(`dragstart`, function (evt) {
    if (evt.target.tagName.toLowerCase() === `img`) {
      draggedItem = evt.target;
      // Объект DataTransfer используется для хранения данных, перетаскиваемых мышью во время операции drag and drop
      evt.dataTransfer.setData(`text`, evt.target.alt);
    }
    return false;
  });

  let artifactsElement = document.querySelector(`.setup-artifacts`);

  // drop - Срабатывает, когда произошло падение в конце операции перетаскивания
  artifactsElement.addEventListener(`drop`, function (evt) {
    evt.target.style.backgroundColor = ``;
    evt.target.appendChild(draggedItem);
    return false;
  });

  // dragenter - Срабатывает, когда перемещаемый элемент попадает на элемент-назначение
  artifactsElement.addEventListener(`dragenter`, function (evt) {
    evt.target.style.backgroundColor = `yellow`;
    evt.preventDefault();
  });

  // dragover - срабатывает каждые несколько сотен милисекунд, когда перемещаемый элемент оказывается над зоной, принимающей перетаскиваемые элементы
  artifactsElement.addEventListener(`dragover`, function (evt) {
    evt.preventDefault();
    return false;
  });

  // dragleave - запускается в момент перетаскивания, когда курсор мыши выходит за пределы элемента
  artifactsElement.addEventListener(`dragleave`, function (evt) {
    evt.target.style.backgroundColor = ``;
    evt.preventDefault();
  });

})();
