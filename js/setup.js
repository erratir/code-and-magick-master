/* global window, document: false */

/**
 * Модуль - всплывающее окно настройки персонажа
 */

/**
 * ТЗ:
 * Создайте файл js/setup.js в вашем учебном проекте. Это файл, в котором
 * вы будете вести работу со всплывающим окном настройки персонажа.
 * В файле index.html подключите ваш файл при помощи тега script.
 * В файле setup.js
 */

(function () {

  let setup = document.querySelector(`.setup`);
  let setupOpen = document.querySelector(`.setup-open`); // аватарка юзера
  let setupClose = setup.querySelector(`.setup-close`); // начинаем поиск с фрагмента сетап, дабы не бегать по всему DOM

  let wizardCoat = document.querySelector(`.wizard-coat`);
  let wizardCoatInput = document.querySelector(`input[name = coat-color]`); // скрытое поле формы, отправляется на сервер
  let wizardEyes = document.querySelector(`.wizard-eyes`);
  let wizardEyesInput = document.querySelector(`input[name = eyes-color]`); // скрытое поле формы, отправляется на сервер
  let wizardFireball = document.querySelector(`.setup-fireball-wrap`);
  let wizardFireballInput = document.querySelector(`input[name = fireball-color]`); // скрытое поле формы, отправляется на сервер

  /**
   *  ------------------------------------------------   module4-task1
   */

  /**
   * 1. Открытие/закрытие окна настройки персонажа:
   *  1.1 Нажатие на элемент .setup-open удаляет класс hidden у блока setup
   *  1.2 Нажатие на элемент .setup-close добавляет класс hidden у блока setup
   */

  /**
   *  Отображает блок управления персонажем -> .setup и
   *  блок настройки схожих персонажей ->.setup-similar
   */
  let openSetupPopup = function () {
    setup.classList.remove(`hidden`);
    document.querySelector(`.setup-similar`).classList.remove(`hidden`);
    // 1.4.1 Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
    document.addEventListener(`keydown`, popupEscPressHandler);
  };

  /**
   *  Скрывает блок управления персонажем -> .setup и
   *  блок настройки схожих персонажей ->.setup-similar
   */
  let closeSetupPopup = function () {
    // 1.4.2 Если фокус находится на форме ввода имени, то окно закрываться не должно.
    if (setup.querySelector(`input[name = username]`) !== document.activeElement) {
      setup.classList.add(`hidden`);
      document.querySelector(`.setup-similar`).classList.add(`hidden`);
      document.removeEventListener(`keydown`, popupEscPressHandler);
    }
  };

  /**
   * ---------------- Обработчики событий -------------------
   */
  // 1.1 клик по аватарке юзера .setup-open
  setupOpen.addEventListener(`click`, openSetupPopup);

  /**
   *  1.3.  Когда иконка пользователя в фокусе .setup-open-icon, то окно
   *  настройки персонажа должно открываться по нажатию кнопки ENTER
   *  Не забудьте добавить tabindex="0" для иконки пользователя, чтобы она фокусировалась.
   */
  setupOpen.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openSetupPopup();
    }
  });

  // 1.2 клик по крестику .setup-close
  setupClose.addEventListener(`click`, closeSetupPopup);

  // 1.5 Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога
  setupClose.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closeSetupPopup();
    }
  });

  /**
   * 1.4 Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
   * Если фокус находится на форме ввода имени, то окно закрываться не должно.
   * @param {Event} evt
   */
  let popupEscPressHandler = function (evt) {
    if (evt.key === `Escape`) {
      closeSetupPopup();
    }
  };

  window.colorize(wizardCoat, window.DataWizards.COAT_COLOR, wizardCoatInput);
  window.colorize(wizardEyes, window.DataWizards.EYES_COLOR, wizardEyesInput);
  window.colorize(wizardFireball, window.DataWizards.FIREBALL_COLOR, wizardFireballInput);

})();
