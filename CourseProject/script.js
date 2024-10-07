document.addEventListener("DOMContentLoaded", (event) => {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  const daysCheckboxes = document.querySelectorAll('#daysButton + .dropdown-content input[type="checkbox"]');
  const unitsCheckboxes = document.querySelectorAll('#unitsButton + .dropdown-content input[type="checkbox"]');

  const unitsButton = document.getElementById("unitsButton");
  const daysButton = document.getElementById("daysButton");

  const daysDropdownContent = daysButton.nextElementSibling;
  const unitsDropdownContent = unitsButton.nextElementSibling;



  // Восстанавливаем значения из localStorage
  if (localStorage.getItem("startDate")) {
    startDateInput.value = localStorage.getItem("startDate");
    endDateInput.disabled = false;
    endDateInput.min = startDateInput.value;
  }

  if (localStorage.getItem("endDate")) {
    endDateInput.value = localStorage.getItem("endDate");
  }


  // Добавляем обработчики событий для чекбоксов Days
  daysCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      validateDates(); // Запуск функции при изменении чекбоксов Days
      
    });
  });

  // Добавляем обработчики событий для чекбоксов Units
  unitsCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function (event) {
      if (unitsButton.disabled) {
        event.preventDefault(); // Запрещаем действие, если кнопка Units не активна
      
      }
      else{checkAllConditions();}
    });
  });


  validateDates();
  checkAllConditions();

});

// Тут ми перевіримо, чи всі умови виконані для того щоб створити додаткове вікно з результатами розрахунків
// Необхідні умови:
// 1. Заповнені поля startDate і endDate
// 2. Обраний хочаб один тип дня
// 3. Обраний хочаб одна одиниця вимірювання
function checkAllConditions() {
  console.log('Попали в ЧекОлКондишнс');
  // console.log("check all cond accessed");
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const daysChecked =
    document.querySelectorAll(
      '#daysButton + .dropdown-content input[type="checkbox"]:checked'
    ).length > 0;
  const unitsChecked =
    document.querySelectorAll(
      '#unitsButton + .dropdown-content input[type="checkbox"]:checked'
    ).length > 0;

  if (startDate && endDate && daysChecked && unitsChecked) {
    createNewWindow();
  }
}

// Створюємо нове вікно, в якому ми бумо відображати результати розрахунків
function createNewWindow() {
  // Перевіряємо, чи вікно вже створено
  if (document.getElementById("newWindow")) return;

  // Створюємо новий елемент для вікна
  const newWindow = document.createElement("div");
  newWindow.id = "newWindow";
  newWindow.classList.add("window");
  newWindow.innerHTML = "<p>New Window</p>";

  // Додаємо нове вікно до контейнеру
  const container = document.querySelector(".container");
  container.appendChild(newWindow);

  // Додаємо стилі до нового вікна
  newWindow.style.position = "absolute";
  newWindow.style.left = "29vw"; // Справа от Window1
  newWindow.style.top = "50px"; // Тот же отступ сверху, что и у Window1
  newWindow.style.width = "25vw"; // Тот же размер по ширине
  newWindow.style.height = "50vh"; // Тот же размер по высоте
  newWindow.style.border = "2px solid #4caf50";
  newWindow.style.borderRadius = "10px";
  newWindow.style.backgroundColor = "#fff";
  newWindow.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  newWindow.style.display = "flex";
  newWindow.style.justifyContent = "center";
  newWindow.style.alignItems = "center";
  newWindow.style.fontSize = "1.5em";
  newWindow.style.color = "#333";
  newWindow.style.opacity = "1";
  newWindow.style.transform = "scale(1)";

  updateNewWindow();
}

function switchWindow(windowNumber) {
  // Переключаем только между Window1 и Window2
  document.querySelectorAll(".window").forEach((window, index) => {
    if (index < 2) {
      // Учитываем только первые два окна (Window1 и Window2)
      window.classList.remove("active");
      document.querySelectorAll(".circle")[index].classList.remove("active");
    }
  });

  setTimeout(() => {
    document.getElementById(`window${windowNumber}`).classList.add("active");
    document
      .querySelectorAll(".circle")
      [windowNumber - 1].classList.add("active");

    // Управляем видимостью newWindow
    const newWindow = document.getElementById("newWindow");
    if (newWindow) {
      if (windowNumber === 1) {
        newWindow.style.display = "flex"; // Показываем newWindow, если активно Window1
      } else {
        newWindow.style.display = "none"; // Скрываем newWindow, если активно Window2
      }
    }
  }, 100); // Задержка для плавного перехода
}

// Знаходимо понеділок для опціїї Week
function getMonday(date) {
  // Створюємо копію вхідної дати, аби не змінювати оигінал
  const monday = new Date(date);
  // Отримуємо день тижня (0 - неділя, 1 - понеділок, ..., 6 - субота )
  const day = monday.getDay();
  // Якщо це неділя (day === 0), віднімаємо 6 днів для отримання понеділка
  // інакше - зміщуємо на к=сть днів до понеділка
  const diff = (day === 0 ? -6 : 1) - day;
  monday.setDate(date.getDate() + diff);

  return monday;
}

function validateDates() {
  console.log('Попали в валидейтДейтс');
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const weekButton = document.getElementById("week");
  const monthButton = document.getElementById("month");
  // Выбираем кнопки Days и Units по id
  const daysButton = document.getElementById("daysButton");
  // const unitsButton = document.getElementById('unitsButton');

  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

    // Проверяем наличие выбранных дней
    const daysChecked = document.querySelectorAll(
      '#daysButton + .dropdown-content input[type="checkbox"]:checked'
    ).length > 0;

  if (startDate) {
    endDateInput.disabled = false;
    endDateInput.min = startDate;
    weekButton.disabled = false;
    monthButton.disabled = false;
    localStorage.setItem("startDate", startDate);
  } else {
    endDateInput.disabled = true;
    endDateInput.value = "";
    weekButton.disabled = true;
    monthButton.disabled = true;
    localStorage.removeItem("startDate");
  }

  if (endDate) {
    // Якщо користувач обрав СтартДейт, яка є більшою за ЕндДейт, тоді очистимо поле ЕндДейт і приберемо його з локалсториджа
    if (new Date(startDate) > new Date(endDate)) {
      endDateInput.value = "";
      localStorage.removeItem("endDate");
    } else {
      localStorage.setItem("endDate", endDate);
    }
  } else {
    localStorage.removeItem("endDate");
  }

  console.log('Попали в валидейтДейтс - проверка дат');
  // Активуємо/деактивуємо кнопку "Days"
  if (startDate && endDate) {
    daysButton.disabled = false;
  } else {
    daysButton.disabled = true;
  }

    // Активация кнопки Units при выполнении условий
    if (startDate && endDate && daysChecked) {
      unitsButton.disabled = false;
    } else {
      unitsButton.disabled = true;
    }

}

let initialStartDate = localStorage.getItem("initialStartDate")
  ? new Date(localStorage.getItem("initialStartDate"))
  : null;

document.getElementById("startDate").addEventListener("change", function () {
  localStorage.setItem("initialStartDate", this.value);

  initialStartDate = new Date(this.value); // Тут зберігаємо першу дату
});

function setPeriod(period) {
  const weekButton = document.getElementById("week");
  const monthButton = document.getElementById("month");

  console.log('попали в setPeriod');

  // Знімаємо активний стан кнопок
  weekButton.classList.remove("active");
  monthButton.classList.remove("active");

  // Получаем стартовую дату из input или используем значение из localStorage
  let startDate = new Date(
    localStorage.getItem("startDate") ||
      document.getElementById("startDate").value
  );
  //  let start, end;

  // Инициализируем start и end как объекты Date
  let start = new Date(startDate); // Initialize with the startDate value
  let end = new Date(startDate); // Initialize similarly

  // Удаляем активный класс со всех кнопок
  document.querySelectorAll(".options button").forEach((button) => {
    button.classList.remove("active");
  });

  // Добавляем активный класс к нажатой кнопке
  if (period === "week") {
    // Активуємо натисну кнопку
    weekButton.classList.add("active");

    start = getMonday(initialStartDate);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
  } else if (period === "month") {
    // Активуємо натисну кнопку
    monthButton.classList.add("active");
    // Дуууууже довго не міг зрозуміти чому в цьому рядку start повертає перший день місяця, а на екрані в startDate я бачу останній день попередньго місяця.
    // Гугл підказав додати до конструкції Date.UTC, бо це могло статися через часові пояси. Тепер все Ок.
    start = new Date(
      Date.UTC(startDate.getFullYear(), initialStartDate.getMonth(), 1)
    );
    end = new Date(
      Date.UTC(startDate.getFullYear(), initialStartDate.getMonth() + 1, 0)
    );


  }



  // Тут оновимо значення на екрані в полях "startDate" і "endDate" на основі вирахуваних значень у змінних start і end
  document.getElementById("startDate").value = start
    .toISOString()
    .split("T")[0];
  document.getElementById("endDate").value = end.toISOString().split("T")[0];

  // Обновляем localStorage
  localStorage.setItem("startDate", start.toISOString().split("T")[0]);
  localStorage.setItem("endDate", end.toISOString().split("T")[0]);

        // Вызываем validateDates для активации/деактивации кнопок
        validateDates();
  
}




function calculateDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end.getTime() - start.getTime();
  const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return totalDays;
}

function calculateWeekdays(startDate, endDate) {
  let count = 0;
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  
  while (currentDate <= end) {
      const day = currentDate.getDay();
      if (day !== 0 && day !== 6) { // Будние дни (Пн-Пт)
          count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
  }
  return count;
}

function calculateWeekends(startDate, endDate) {
  let count = 0;
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  
  while (currentDate <= end) {
      const day = currentDate.getDay();
      if (day === 0 || day === 6) { // Выходные (Сб-Вс)
          count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
  }
  return count;
}


function calculateHours(startDate, endDate) {
  let count = 0;

  return count;
}

function calculateMinutes(startDate, endDate) {
  let count = 0;

  return count;
}

function calculateSeconds(startDate, endDate) {
  let count = 0;

  return count;
}


function updateNewWindow() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  const allDaysChecked = document.getElementById("allDays").checked;
  const weekdaysChecked = document.getElementById("weekDays").checked;
  const weekendsChecked = document.getElementById("weekEnds").checked;

  const unitDaysChecked = document.getElementById("days").checked;
  const unitHoursChecked = document.getElementById("hours").checked;
  const unitMinutesChecked = document.getElementById("minutes").checked;
  const unitSecondsChecked = document.getElementById("seconds").checked;

 // Добавляем заголовок с датами
 let resultHTML = `<h2 class="result-title">С ${startDate} по ${endDate}:</h2><ul class="result-list">`;

 const units = [
  { checked: unitDaysChecked, calculate: calculateDays, label: 'Calendar days' },
  { checked: unitHoursChecked, calculate: calculateHours, label: 'Hours in calendar days' },
  { checked: unitMinutesChecked, calculate: calculateMinutes, label: 'Minutes in calendar days' },
  { checked: unitSecondsChecked, calculate: calculateSeconds, label: 'Seconds in calendar days' }
];

  if (allDaysChecked) {
    units.forEach(unit => {
      if (unit.checked) {
        const totalValue = unit.calculate(startDate, endDate); // вызываем соответствующую функцию расчета
        resultHTML += `<li> ${totalValue} <strong>${unit.label}</strong></li>`;
      }
    });
  }
  if (weekdaysChecked) {
    const weekdays = calculateWeekdays(startDate, endDate);
    resultHTML += `<li><strong>Будних дней:</strong> ${weekdays}</li>`;
  }

  if (weekendsChecked) {
    const weekends = calculateWeekends(startDate, endDate);
    resultHTML += `<li><strong>Выходных дней:</strong> ${weekends}</li>`;
  }

  resultHTML += '</ul>';

  console.log(resultHTML);

  const newWindow = document.getElementById("newWindow");
  if (newWindow) {
    newWindow.innerHTML = resultHTML;
  }
}

document.getElementById("allDays").addEventListener("change", updateNewWindow);
document.getElementById("weekDays").addEventListener("change", updateNewWindow);
document.getElementById("weekEnds").addEventListener("change", updateNewWindow);

document.getElementById("days").addEventListener("change", updateNewWindow);
document.getElementById("hours").addEventListener("change", updateNewWindow);
document.getElementById("minutes").addEventListener("change", updateNewWindow);
document.getElementById("seconds").addEventListener("change", updateNewWindow);

document.getElementById("startDate").addEventListener("change", updateNewWindow);
document.getElementById("endDate").addEventListener("change", updateNewWindow);


document.getElementById("startDate").addEventListener("change", function () {
  console.log('Попали в івентлисенер СтартДейт');
  localStorage.setItem("startDate", this.value);
  validateDates();
});

document.getElementById("endDate").addEventListener("change", function () {
  console.log('Попали в івентлисенер ЕндДейт');
  localStorage.setItem("endDate", this.value);
  validateDates();
});

document.getElementById("week").addEventListener("click", function() {
  console.log('попали в лисенер вик');
  setPeriod('week');
  const newWindow = document.getElementById("newWindow");
  if (newWindow && newWindow.style.display === "flex") {
    updateNewWindow(); // Обновляем окно с результатами только если оно активно
  }
});


document.getElementById("month").addEventListener("click", function() {
  console.log('попали в лисенер монс');
  setPeriod('month');
  const newWindow = document.getElementById("newWindow");
  if (newWindow && newWindow.style.display === "flex") {
    updateNewWindow(); // Обновляем окно с результатами только если оно активно
  }
});

document.getElementById("resetButton").addEventListener("click", function () {
  // Чистимо поля з датами
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("endDate").disabled = true;

  // Чистимо всі чекбокси
  const checkboxes = document.querySelectorAll(
    "#window1 input[type='checkbox']"
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Очищаем localStorage
  localStorage.clear();

  // Деактивируем кнопки "Week" и "Month"
  document.getElementById("week").disabled = true;
  document.getElementById("month").disabled = true;

  // Убираем активные классы с кнопок "Week" и "Month"
  document.getElementById("week").classList.remove("active");
  document.getElementById("month").classList.remove("active");

  // Деактивируем кнопки "Days" и "Units"
  document.getElementById("daysButton").disabled = true;
  document.getElementById("unitsButton").disabled = true;

  // Сбрасываем активные классы на кнопках периода
  document.querySelectorAll(".options button").forEach((button) => {
    button.classList.remove("active");
  });

  // Удаляем newWindow, если оно существует
  const newWindow = document.getElementById("newWindow");
  if (newWindow) {
    newWindow.remove(); // Удаляем элемент newWindow из DOM
  }
});

checkAllConditions();
