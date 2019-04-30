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
  /**
   * ТЗ: Доработайте модуль, отрисовывающий похожих волшебников таким
   * образом, чтобы при изменении цвета глаз или цвета плаща, показывались
   * волшебники из набора данных, полученных с сервера, волшебники, сильнее всего похожие на волшебника пользователя.
   * При проверке похожести волшебников, нужно учитывать сначала
   * совпадение цвета плаща, потом совпадение цвета глаз. Таким образом,
   * сначала должны показываться волшебники, у которых совпадает цвет
   * плаща и цвет глаз, затем волшебники, у которых совпадает только цвет
   * плаща, затем волшебники с таким же цветом глаз, а после этого все остальные волшебники.
   */

  /**
   * Функция сортирует массив похожих волшебников в соответсввии с настройками текущего персонажа и заданными условиями ранжирования
   * @param {string} wizardCoat - Цвет плаща текущего персонажа
   * @param {string} wizardEyes - Цвет глаз текущего персонажа
   */
  let updateWizards = function (wizardCoat, wizardEyes) {

    // Отсортируем массив волшебников в соответсвии с заданными условиями ранжирования, см. getRank()
    let filteredWizards = wizards.sort(function (left, right) {
      return getRank(wizardCoat, wizardEyes, right) - getRank(wizardCoat, wizardEyes, left);
    });

    renderWizards(filteredWizards);
  };

  /**
   * Функция принимает на вход объект `волшебник` из массива похожих (wizards) и возвращает его "ранг"
   * 3 - если цвет плаща и глаз соответствует заданным
   * 2 - если цвет плаща соответствует заданным
   * 1 - если цвет глаз соответствует заданным
   * @param {string} wizardCoat
   * @param {string} wizardEyes
   * @param {object} wizard
   * @return {number} rank
   */
  let getRank = function (wizardCoat, wizardEyes, wizard) {
    let rank = 0;

    if (wizard.colorCoat === wizardCoat) {
      rank += 2;
    }
    if (wizard.colorEyes === wizardEyes) {
      rank += 1;
    }
    return rank;

  };

  window.similarWiz = {
    DataWizards: {
      COUNT: 4,
      WIZARD_NAMES: [`Gandalf`, `Shang`, `Doctor`, `Abdurrakhman`, `Harry`, `Balthazar`, `Albus`, `Lord`, `Saruman`, `Darth`, `Anakin`, `Obi-Wan`, `Luke`, `Master`],
      WIZARD_SURNAME: [`Grey`, `Tsung`, `Strange`, `ibn Hottab`, `Potter`, `Blake`, `Dumbledore`, `Voldemort`, `White`, `Vader`, `Skywalker`, `Kenobi`, `Skywalker`, `Yoda`],
      COAT_COLOR: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
      EYES_COLOR: [`black`, `red`, `blue`, `yellow`, `green`],
      FIREBALL_COLOR: [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`],
    },
    updateWizards,
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
    this.name = `${window.utils.getRandomElement(window.similarWiz.DataWizards.WIZARD_NAMES)} ${window.utils.getRandomElement(window.similarWiz.DataWizards.WIZARD_SURNAME)}`;
    this.colorCoat = window.utils.getRandomElement(window.similarWiz.DataWizards.COAT_COLOR);
    this.colorEyes = window.utils.getRandomElement(window.similarWiz.DataWizards.EYES_COLOR);
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
   * @param {array} wizardsArray
   */
  let renderWizards = function (wizardsArray) {
    let fragment = document.createDocumentFragment(); // создаем фрагмент документа, который хранится в памяти

    // добавляем в фрагмент документа детей
    for (let i = 0; i < window.similarWiz.DataWizards.COUNT; i++) {
      fragment.appendChild(generateWizardClone(wizardsArray[i]));
    }
    // Удаление всех дочерних элементов Списка похожих волшебников
    while (similarListElement.firstChild) {
      similarListElement.removeChild(similarListElement.firstChild);
    }

    similarListElement.appendChild(fragment); // Присоединяем фрагмент к основному дереву. В основном дереве фрагмент буден заменён собственными дочерними элементами.
  };

  /**
   * Функция получает данные о похожих волшебниках с сервера.
   * В случае ошибки используются моковые данные (4 волшебника конструируются из similarWiz.DataWizards)
   */
  let getSimilarWizards = function () {

    window.backend.getData()
      .then(function (data) {
        if (data) {
          wizards = data; // В массив wizards записываем полученные данные с сервера (массив из 17 волшебников)
        } else {
          // В случае, если getData() вернул null (ответ сервера ==! 200), генерируем похожих волшебников из моковых данных
          for (let i = 0; i < window.similarWiz.DataWizards.COUNT; i++) {
            wizards.push(new Wizard());
          }
        }
        // Далее сортируем массив волшебников (по похожести и рендерим их)
        updateWizards(document.querySelector(`.wizard-coat`).style.fill, document.querySelector(`.wizard-eyes`).style.fill);
        // renderWizards(wizards); // поскольку запрос к серверу асинхронный дальнейший renderWizards() запускаем отсюда
      });
  };

  getSimilarWizards();

})();
