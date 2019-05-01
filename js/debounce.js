/* global window: false */
(function () {
  let lastTimeout;

  /**
   * `Устранение дребезга` (debounce)
   * Принимает на вход функцию и задержку в мс. Запускает функцию через заданное кол-во мс,
   * только если функция не была вызвана повторно за это время
   * Используется например для обработки слишком частых кликов. Ф-я выполнится, только после последнего клика.
   * @param {function} cb
   * @param {number} delay / задержка в ms
   */
  window.debounce = function (cb, delay) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, delay);
  };
})();
