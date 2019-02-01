/**
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
'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10; // отступ от края облака
var COLUMN_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_BETWIN = 50;


/**
 * Функция отрисовки облака
 * use http://canvimation.github.io/
 * use https://ruseller.com/lessons.php?rub=1&id=1122
 * @param {Object} ctx
 * @param {number} x
 * @param {number} y
 * @param {string} collor
 */
var renderCloud = function (ctx, x, y, collor) {
  // ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  // ctx.fillRect(x+10, y+10, CLOUD_WIDTH, CLOUD_HEIGHT);
  // ctx.fillStyle = '#ffffff';
  // ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = collor;
  ctx.beginPath();
  ctx.moveTo(x + 20, y + 170);
  ctx.bezierCurveTo(x, y + 220, x + 20, y + CLOUD_HEIGHT, x + 100, y + CLOUD_HEIGHT);
  ctx.bezierCurveTo(x + 180, y + CLOUD_HEIGHT, x + 240, y + CLOUD_HEIGHT, x + 340, y + CLOUD_HEIGHT);
  ctx.bezierCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH, y + 200, x + 380, y + 180);
  ctx.bezierCurveTo(x + CLOUD_WIDTH, y + 160, x + CLOUD_WIDTH, y + 100, x + 380, y + 80);
  ctx.bezierCurveTo(x + CLOUD_WIDTH, y - 20, x + CLOUD_HEIGHT, y - 20, x + 200, y + 20);
  ctx.bezierCurveTo(x + 180, y - 20, x, y, x + 40, y + 80);
  ctx.bezierCurveTo(x, y + 80, x, y + 130, x + 20, y + 170);
  ctx.closePath();
  //ctx.stroke();
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
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  // Вызываем renderCloud() для отрисовки облака
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');


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
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  var message = 'Ура вы победили!\nСписок результатов:';
  message.split('\n').forEach(function (line, i) {
    ctx.fillText(line, CLOUD_X + 120, CLOUD_Y + 30 + 20 * i);
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
  var colorPlayer;
  var maxTime = Math.max(...times); //Наибольший элемент в массиве
  // пропорциональный столбик (высота) = (times[i] * COLUMN_HEIGHT) / maxTime

  players.forEach(function(item, i, arr) {
    var columnHeight = (times[i] * COLUMN_HEIGHT) / maxTime; // высота каждого столбца, пропорционально максимальному
                                                            // (за максимальный принимаем maxTime=COLUMN_HEIGHT=150px;
    if (players[i] === "You") {
      colorPlayer = 'rgba(255, 0, 0, 1)';
    }
    else {
      colorPlayer = `rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, 255, 1)`;
    }
    ctx.fillStyle = colorPlayer;
    ctx.fillRect(CLOUD_X + COLUMN_BETWIN + (COLUMN_WIDTH + COLUMN_BETWIN) * i, CLOUD_Y + GAP * 8 + (COLUMN_HEIGHT - columnHeight), COLUMN_WIDTH, columnHeight );
    ctx.fillText(item, CLOUD_X + COLUMN_BETWIN + (COLUMN_WIDTH + COLUMN_BETWIN) * i, CLOUD_Y + GAP * 9 + COLUMN_HEIGHT);
  });
};
