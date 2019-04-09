/* global window: false */

/**
 * Изменение цвета (мантии, глаз, фаербола) персонажа по нажатию
 * Пункты 3, 4, 5
 * Для того, чтобы на сервер отправились правильные данные, при изменении параметров персонажа
 * должно изменяться и значение соответствующего скрытого инпута.
 */
(function () {
  /**
   * Функция вешает на элемент обработчик клик.
   * Который при клике по элементу заливает (.fill) HTMLElement случайным цветом. Если это div, то (.background)
   * А также если передан inputElement (скрытое поле формы, которое потом отправляется на сервер), записывает в него цвет
   * querySelector(`input[name = coat-color]`) || `input[name = eyes-color]` || `input[name = fireball-color]`
   * @param {HTMLElement} element
   * @param {Array} colorArr Массив цветов из которых необходимо выбрать случайный
   * @param {HTMLElement} inputElement
   */
  window.colorize = function (element, colorArr, inputElement) {
    element.addEventListener(`click`, function () {
      let color = window.utils.getRandomElement(colorArr);
      if (element.tagName.toLowerCase() === `div`) {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
      //
      if (inputElement) {
        inputElement.value = color;
      }
    });

  };
})();
