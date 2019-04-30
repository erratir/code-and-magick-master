/* global window: false */

/**
 * Модуль со вспомогательными функциями
 */
(function () {
  window.utils = {

    /**
     *  Функция возвращает массив с уникальными элементами
     * Только в ES6 https://webformyself.com/kak-proizvesti-udalenie-dublej-massiva-v-es6/
     * @param {array} arr
     * @return {any[]}
     */
    returnUniqueArray(arr) {
      return Array.from(new Set(arr));
    },

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

    /**
     * Функция случайно перемешивает эл-ы массива
     * https://habr.com/ru/post/358094/
     * @param {array} arr
     * @return {array}
     */
    shuffle(arr) {
      let j; let temp;
      for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    },
  };
})();
