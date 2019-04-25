/* global window, document: false */

/**
 *  ТЗ:
 *  2.  Создайте массив, состоящий из 4 сгенерированных JS объектов, которые
 * будут описывать похожих персонажей. Объекты должны содержать следующие поля:
 *
 * - name, строка — случайно сгенерированное имя персонажа. Имя  генерируется
 * из массивов имен и фамилий: нужно случайным образом выбрать из массива имен имя,
 * а из массива фамилий  фамилию и сложить их. При желании имя и фамилию можно
 * в случайном порядке менять местами:)
 *
 * - colorCoat, строка — случайный цвет мантии на выбор из следующих: ...
 *
 * - colorEyes, строка — случайный цвет глаз персонажа на выбор из следующих: ...
 */

(function () {
  window.DataWizards = {
    COUNT: 4,
    WIZARD_NAMES: [`Gandalf`, `Shang`, `Doctor`, `Abdurrakhman`, `Harry`, `Balthazar`, `Albus`, `Lord`, `Saruman`, `Darth`, `Anakin`, `Obi-Wan`, `Luke`, `Master`],
    WIZARD_SURNAME: [`Grey`, `Tsung`, `Strange`, `ibn Hottab`, `Potter`, `Blake`, `Dumbledore`, `Voldemort`, `White`, `Vader`, `Skywalker`, `Kenobi`, `Skywalker`, `Yoda`],
    COAT_COLOR: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
    EYES_COLOR: [`black`, `red`, `blue`, `yellow`, `green`],
    FIREBALL_COLOR: [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`],
  };

  let wizards = [];
  /**
   * // В переменную similarWizardTemplate записываем контент из шаблона
   * (тег <template> в index.html), т.е. весь <div class="setup-similar-item">
   */
  let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
  /**
   * В переменную similarListElement записываем <div>
   * в который будем помещать созданный на основе шаблона similarWizardTemplate контент
   * <div class="setup-similar-list">Похожие персонажи</h4>
   */
  let similarListElement = document.querySelector(`.setup-similar-list`);

  /**
   * Функция конструктор объекта Wizard
   * @constructor
   */
  let Wizard = function () {
    this.name = `${window.utils.getRandomElement(window.DataWizards.WIZARD_NAMES)} ${window.utils.getRandomElement(window.DataWizards.WIZARD_SURNAME)}`;
    this.colorCoat = window.utils.getRandomElement(window.DataWizards.COAT_COLOR);
    this.colorEyes = window.utils.getRandomElement(window.DataWizards.EYES_COLOR);
  };

  /**
   * Генерируем шаблон волшебника
   * 3. На основе данных, созданных в предыдущем пункте и шаблона #similar-wizard-template создайте DOM-элементы,
   * соответствующие случайно сгенерированным волшебникам и заполните их данными из массива:
   *       Имя персонажа name запишите как текст в блок .setup-similar-label;
   *       Цвет мантии colorCoat задайте как цвет заливки fill в стилях элемента .wizard-coat;
   *       Цвет глаз colorEyes задайте как цвет заливки fill в стилях элемента .wizard-eyes.
   *
   * @param {Object} wizard
   * @return {Node}
   */
  let generateWizardClone = function (wizard) {
    let cloneWizard = similarWizardTemplate.cloneNode(true);
    cloneWizard.querySelector(`.setup-similar-label`).textContent = wizard.name;
    cloneWizard.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    cloneWizard.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;
    return cloneWizard;
  };

  /**
   * 4. Отрисуйте сгенерированные DOM-элементы в блок .setup-similar-list.
   * Для вставки элементов используйте DocumentFragment.
   * @type {DocumentFragment}
   */
  let renderWizards = function () {
    let fragment = document.createDocumentFragment(); // создаем фрагмент документа, который хранится в памяти

    // добавляем в фрагмент документа детей
    for (let i = 0; i < window.DataWizards.COUNT; i++) {
      fragment.appendChild(generateWizardClone(wizards[i]));
    }

    similarListElement.appendChild(fragment); // Присоединяем фрагмент к основному дереву. В основном дереве фрагмент буден заменён собственными дочерними элементами.
  };

  /**
   * Функция получает данные о похожих волшебниках с сервера.
   * В случае ошибки используются моковые данные (4 волшебника конструируются из DataWizards)
   */
  let getSimilarWizards = function () {

    window.backend.getData()
      .then(function (data) {
        wizards = data; // В массив wizards записываем полученные данные с сервера (массив из 17 волшебников)
        // TODO выбрать из всего массива волшебников именно похожих
        renderWizards(); // поскольку запрос к сервиру асинхронный дальнейший renderWizards() запускаем отсюда
      }).then(null, function () { // В случае ошибки, генерируем похожих волшебников
        for (let i = 0; i < window.DataWizards.COUNT; i++) {
          wizards.push(new Wizard());
          renderWizards();
        }
      });
  };

  getSimilarWizards();

})();
