/* global window: false */

/**
 * Модуль со вспомогательными функциями
 */
(function () {
  window.utils = {

    /**
     * Функция, возвращает случайный элемемент массива
     * https://learn.javascript.ru/array
     * @param {array} array
     * @return {*}
     */
    getRandomElement(array) {
      let randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    },


  };
})();
