/* global window: false */

/**
 * Модуль отрисовки статистики, после прохождения уровня.
 * Статистиа в виде гистограммы в облаке с результатами. Все отрисовывется в виде канваса.
 */

/**
 * ТЗ:
 * В форке учебного проекта создайте ветку module2-task1 и в этой ветке выполните
 следующие шаги:
 1. Создайте файл js/stat.js в вашем учебном проекте. Это файл, в котором
 вы будете реализовывать улучшение игры.
 2. В файле index.html подключите ваш файл к коду страницы при помощи
 тега script непосредственно перед скриптом игры game.js.
 Задача
 В новом файле js/stat.js определите функцию renderStatistics, которая будет
 являться методом объекта window, со следующими параметрами:
 •  ctx — канвас на котором рисуется игра.
 •  players — массив, с именами игроков прошедших уровень. Имя самого
 игрока — Вы. Массив имён формируется случайным образом.
 •  times — массив, по длине совпадающий с массивом names. Массив
 содержит время прохождения уровня соответствующего игрока
 из массива names. Время прохождения уровня задано в миллисекундах.
 Эта функция будет вызываться каждый раз, когда игрок проходит уровень. Чтобы
 успешно пройти уровень, надо выстрелить фаерболом (клавиша Shift) в забор.
 При вызове этой функции на канвас ctx должны быть выведены следующие
 элементы:
 1.  Белое облако с координатами [100, 10] высотой 270px и шириной 420px.
 Облако может быть, как правильным многоугольником, нарисованным
 методом fillRect, так и неправильным нарисованным с помощью
 методов beginPath, moveTo, closePath, fill и других. 2.  Под облаком должна располагаться тень: многоугольник такой же формы,
 залитый цветом rgba(0, 0, 0, 0.7) (полупрозрачный чёрный), смещённый
 относительно белого на 10px вниз и вправо.
 3.  На облаке должен быть отрисован текст сообщения ’Ура
 вы победили!\nСписок результатов:’с помощью метода fillText. Текст
 должен быть набран шрифтом PT Mono размером 16px. NB! Особенностью
 отрисовки текста на канвасе является то, что он не поддерживает
 перенос, поэтому каждая новая строчка должна быть отрисована
 новым вызовом метода fillText или strokeText.
 * Обратите внимание
 * Функцию отрисовки статистики вызывать не надо. Её будет вызывать
 * непосредственно сама игра из файла js/game.js.
 * Обратите внимание
 * Время прохождения игры должно быть округлено к целому числу.
 */

(function () {

  let Cloud = {
    WIDTH: 420,
    HEIGHT: 270,
    X: 100,
    Y: 10,
    GAP: 10, // отступ от края облака
    COLOR: `#fff`,
    SHADOW_COLOR: `rgba(0, 0, 0, 0.7)`,
  };

  let Bar = {
    MAX_HEIGHT: 150,
    WIDTH: 40,
    BETWIN: 50,
  };

  let Text = {
    FONT: `16px PT Mono`,
    COLOR: `#000`,
  };

  /**
   * Функция отрисовки облака
   * use http://canvimation.github.io/
   * use https://ruseller.com/lessons.php?rub=1&id=1122
   * @param {Object} ctx
   * @param {number} x
   * @param {number} y
   * @param {string} color
   */
  let renderCloud = function (ctx, x, y, color) {
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    // ctx.fillRect(x+10, y+10, Cloud.WIDTH, Cloud.HEIGHT);
    // ctx.fillStyle = '#ffffff';
    // ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + 20, y + 170);
    ctx.bezierCurveTo(x, y + 220, x + 20, y + Cloud.HEIGHT, x + 100, y + Cloud.HEIGHT);
    ctx.bezierCurveTo(x + 180, y + Cloud.HEIGHT, x + 240, y + Cloud.HEIGHT, x + 340, y + Cloud.HEIGHT);
    ctx.bezierCurveTo(x + Cloud.WIDTH, y + Cloud.HEIGHT, x + Cloud.WIDTH, y + 200, x + 380, y + 180);
    ctx.bezierCurveTo(x + Cloud.WIDTH, y + 160, x + Cloud.WIDTH, y + 100, x + 380, y + 80);
    ctx.bezierCurveTo(x + Cloud.WIDTH, y - 20, x + Cloud.HEIGHT, y - 20, x + 200, y + 20);
    ctx.bezierCurveTo(x + 180, y - 20, x, y, x + 40, y + 80);
    ctx.bezierCurveTo(x, y + 80, x, y + 130, x + 20, y + 170);
    ctx.closePath();
    // ctx.stroke();
    ctx.fill();
  };

  /**
   * Функция вывода статистики
   * @param {Object} ctx
   * @param {array} players
   * @param {array} times
   */
  window.renderStatistics = function (ctx, players, times) {

    // Вызываем renderCloud() для отрисовки тени облака
    renderCloud(ctx, Cloud.X + 10, Cloud.Y + 10, Cloud.SHADOW_COLOR);
    // Вызываем renderCloud() для отрисовки облака
    renderCloud(ctx, Cloud.X, Cloud.Y, Cloud.COLOR);

    /**
     * 3. Отрисовка заголовка в облаке | Конструкция ниже как в game.js
     * На облаке должен быть отрисован текст сообщения ’Ура
     * вы победили!\nСписок результатов:’с помощью метода fillText. Текст
     * должен быть набран шрифтом PT Mono размером 16px. NB! Особенностью
     * отрисовки текста на канвасе является то, что он не поддерживает
     * перенос, поэтому каждая новая строчка должна быть отрисована
     * новым вызовом метода fillText или strokeText.
     * @type {string}
     */
    ctx.fillStyle = Text.COLOR;
    ctx.font = Text.FONT;
    ctx.textBaseline = `hanging`;
    let message = `Ура вы победили!\nСписок результатов:`;
    message.split(`\n`).forEach(function (line, i) {
      ctx.fillText(line, Cloud.X + 120, Cloud.Y + 30 + 20 * i);
    });

    /**
     * 4. Отрисовка гистограммы в облаке
     * После сообщения о победе должна располагаться гистограмма времён
     * участников. Параметры гистограммы следующие:
     * o  Высота гистограммы 150px.
     * o  Ширина колонки 40px.
     * o  Расстояние между колонками 50px.
     * o  Цвет колонки игрока Вы rgba(255, 0, 0, 1).
     * o  Цвет колонок других игроков — синий, а насыщенность задаётся
     * случайным образом.
     * */
    let barColor;
    let maxTime = Math.max(...times); // Наибольший элемент в массиве
    // пропорциональный столбик (высота) = (times[i] * Bar.MAX_HEIGHT) / maxTime

    players.forEach(function (item, i) {
      let barHeight = (times[i] * Bar.MAX_HEIGHT) / maxTime; // высота каждого столбца, пропорционально максимальному
      // (за максимальный принимаем maxTime=Bar.MAX_HEIGHT=150px;
      if (players[i] === `You`) {
        barColor = `rgba(255, 0, 0, 1)`;
      } else {
        barColor = `hsl(240, ${Math.floor(Math.random() * 100)}%, 50%)`; // Синий, случайная насыщенность в HSL
      }
      ctx.fillStyle = barColor;
      ctx.fillRect(Cloud.X + Bar.BETWIN + (Bar.WIDTH + Bar.BETWIN) * i, Cloud.Y + Cloud.GAP * 8 + (Bar.MAX_HEIGHT - barHeight), Bar.WIDTH, barHeight);
      ctx.fillText(item, Cloud.X + Bar.BETWIN + (Bar.WIDTH + Bar.BETWIN) * i, Cloud.Y + Cloud.GAP * 9 + Bar.MAX_HEIGHT);
    });
  };

})();
