/* global document: false */
/**
 * Создайте файл js/setup.js в вашем учебном проекте. Это файл, в котором
 * вы будете вести работу со всплывающим окном настройки персонажа.
 * В файле index.html подключите ваш файл при помощи тега script.
 * В файле setup.js
 *
 * 2.  Создайте массив, состоящий из 4 сгенерированных JS объектов, которые
 * будут описывать похожих персонажей. Объекты должны содержать следующие поля:
 *
 * - name, строка — случайно сгенерированное имя персонажа. Имя  генерируется
 * из массивов имен и фамилий: нужно случайным образом выбрать из массива имен имя,
 * а из массива фамилий  фамилию и сложить их. При желании имя и фамилию можно
 * в случайном порядке менять местами:)
 *
 * - coatColor, строка — случайный цвет мантии на выбор из следующих: ...
 *
 * - eyesColor, строка — случайный цвет глаз персонажа на выбор из следующих: ...
 */
let DataWizards = {
  COUNT: 4,
  WIZARD_NAMES: [`Gandalf`, `Shang`, `Doctor`, `Abdurrakhman`, `Harry`, `Balthazar`, `Albus`, `Lord`, `Saruman`, `Darth`, `Anakin`, `Obi-Wan`, `Luke`, `Master`],
  WIZARD_SURNAME: [`Grey`, `Tsung`, `Strange`, `ibn Hottab`, `Potter`, `Blake`, `Dumbledore`, `Voldemort`, `White`, `Vader`, `Skywalker`, `Kenobi`, `Skywalker`, `Yoda`],
  COAT_COLOR: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  EYES_COLOR: [`black`, `red`, `blue`, `yellow`, `green`]
};

let KEY_CODE = {
  ENTER: 13,
  ESC: 27
};

/**
 * // В переменную SimilarWizardTemplate записываем контент из шаблона
 * (тег <template> в index.html), т.е. весь <div class="setup-similar-item">
 */
let SimilarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

/**
 * В переменную SimilarListElement записываем <div>
 * в который будем помещать созданный на основе шаблона SimilarWizardTemplate контент
 * <div class="setup-similar-list">Похожие персонажи</h4>
 */
let SimilarListElement = document.querySelector(`.setup-similar-list`);

/**
 * Функция конструктор объекта Wizard
 * @constructor
 */
function Wizard() {
  this.name = `${getRandomElement(DataWizards.WIZARD_NAMES)} ${getRandomElement(DataWizards.WIZARD_SURNAME)}`;
  this.coatColor = getRandomElement(DataWizards.COAT_COLOR);
  this.eyesColor = getRandomElement(DataWizards.EYES_COLOR);
}

/**
 *  Сгенерируем массив из 4х обектов Wizard
 *  Функция генерирует массив из объектов Wizard (кол-во в DataWizards.COUNT)
 *  Объекты создаются вызовом функции конструктора new Wizard()
 */
let wizards = [];
for (let i = 0; i < DataWizards.COUNT; i++) {
  wizards.push(new Wizard());
}

// Вызываем функцию renderWizards()
renderWizards();

/**
 * Функция, возвращающая случайный элемемент массива
 * https://learn.javascript.ru/array
 * @param {array} array
 * @return {*}
 */
function getRandomElement(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**
 * Генерируем шаблон волшебника
 * 3. На основе данных, созданных в предыдущем пункте и шаблона #similar-wizard-template создайте DOM-элементы,
 * соответствующие случайно сгенерированным волшебникам и заполните их данными из массива:
 *       Имя персонажа name запишите как текст в блок .setup-similar-label;
 *       Цвет мантии coatColor задайте как цвет заливки fill в стилях элемента .wizard-coat;
 *       Цвет глаз eyesColor задайте как цвет заливки fill в стилях элемента .wizard-eyes.
 *
 * @param {Object} wizard
 * @return {Node}
 */
function generateWizardClone(wizard) {
  let cloneWizard = SimilarWizardTemplate.cloneNode(true);
  cloneWizard.querySelector(`.setup-similar-label`).textContent = wizard.name;
  cloneWizard.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  cloneWizard.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return cloneWizard;
}

/**
 * 4. Отрисуйте сгенерированные DOM-элементы в блок .setup-similar-list.
 * Для вставки элементов используйте DocumentFragment.
 * @type {DocumentFragment}
 */
function renderWizards() {
  let fragment = document.createDocumentFragment(); // создаем фрагмент документа, который хранится в памяти

  // добавляем в фрагмент документа детей
  for (let i = 0; i < DataWizards.COUNT; i++) {
    fragment.appendChild(generateWizardClone(wizards[i]));
  }

  SimilarListElement.appendChild(fragment); // Присоединяем фрагмент к основному дереву. В основном дереве фрагмент буден заменён собственными дочерними элементами.
}

/**
 *  module4-task1
 */

/**
 * 1. Открытие/закрытие окна настройки персонажа:
 *  1.1 Нажатие на элемент .setup-open удаляет класс hidden у блока setup
 *  1.2 Нажатие на элемент .setup-close добавляет класс hidden у блока setup
 */
let setup = document.querySelector(`.setup`);
let setupClose = setup.querySelector(`.setup-close`); // начинаем поиск с фрагмента сетап, дабы не бегать по всему DOM
let setupOpen = document.querySelector(`.setup-open`); // аватарка юзера
let popupEscPressHandler = function (evt) {
  if (evt.keyCode === KEY_CODE.ESC) {
    closeSetupPopup();
  }
};


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
 * ---------------- Обработчики событий
 */

// 1.1 клик по аватарке юзера .setup-open
setupOpen.addEventListener(`click`, openSetupPopup);
/**
 *  1.3.  Когда иконка пользователя в фокусе .setup-open-icon, то окно
 *  настройки персонажа должно открываться по нажатию кнопки ENTER
 *  Не забудьте добавить tabindex="0" для иконки пользователя, чтобы она фокусировалась.
 */
setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === KEY_CODE.ENTER) {
    openSetupPopup();
  }
});

// 1.2 клик по крестику .setup-close
setupClose.addEventListener(`click`, closeSetupPopup);
// 1.5 Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога
setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === KEY_CODE.ENTER) {
    closeSetupPopup();
  }
});

