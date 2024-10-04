document.addEventListener("DOMContentLoaded", (event) => {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const daysCheckboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]:not([id^="extraOption"])');
  const unitsCheckboxes = document.querySelectorAll('.dropdown-content input[id^="extraOption"]');

  // Восстанавливаем значения из localStorage
  if (localStorage.getItem("startDate")) {
    startDateInput.value = localStorage.getItem("startDate");
    endDateInput.disabled = false;
    endDateInput.min = startDateInput.value;
  }

  if (localStorage.getItem("endDate")) {
    endDateInput.value = localStorage.getItem("endDate");
  }

  validateDates();

    // Добавляем обработчики событий для чекбоксов Days и Units
    daysCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', checkAllConditions);
    });
  
    unitsCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', checkAllConditions);
    });
});

// Проверка всех условий для создания нового окна
function checkAllConditions() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const daysChecked = document.querySelectorAll('.dropdown-content input[type="checkbox"]:not([id^="extraOption"]):checked').length > 0;
  const unitsChecked = document.querySelectorAll('.dropdown-content input[id^="extraOption"]:checked').length > 0;

  if (startDate && endDate && daysChecked && unitsChecked) {
    createNewWindow();
  }
}

// Создание нового окна справа от Window1
function createNewWindow() {
  // Проверяем, существует ли уже новое окно, чтобы не создавать повторно
  if (document.getElementById('newWindow')) return;

  // Создаем новый элемент для окна
  const newWindow = document.createElement('div');
  newWindow.id = 'newWindow';
  newWindow.classList.add('window');
  newWindow.innerHTML = '<p>New Window</p>';

  // Добавляем новое окно в контейнер
  const container = document.querySelector('.container');
  container.appendChild(newWindow);

  // Применяем стили для нового окна
  newWindow.style.position = 'absolute';
  newWindow.style.left = '60vw'; // Справа от Window1
  newWindow.style.top = '50px'; // Тот же отступ сверху, что и у Window1
  newWindow.style.width = '50vw'; // Тот же размер по ширине
  newWindow.style.height = '50vh'; // Тот же размер по высоте
  newWindow.style.border = '2px solid #4caf50';
  newWindow.style.borderRadius = '10px';
  newWindow.style.backgroundColor = '#fff';
  newWindow.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  newWindow.style.display = 'flex';
  newWindow.style.justifyContent = 'center';
  newWindow.style.alignItems = 'center';
  newWindow.style.fontSize = '1.5em';
  newWindow.style.color = '#333';
  newWindow.style.opacity = '1';
  newWindow.style.transform = 'scale(1)';
}

function switchWindow(windowNumber) {
  // Переключаем только между Window1 и Window2
  document.querySelectorAll(".window").forEach((window, index) => {
    if (index < 2) { // Учитываем только первые два окна (Window1 и Window2)
      window.classList.remove("active");
      document.querySelectorAll(".circle")[index].classList.remove("active");
    }
  });

  setTimeout(() => {
    document.getElementById(`window${windowNumber}`).classList.add("active");
    document.querySelectorAll(".circle")[windowNumber - 1].classList.add("active");

    // Управляем видимостью newWindow
    const newWindow = document.getElementById('newWindow');
    if (newWindow) {
      if (windowNumber === 1) {
        newWindow.style.display = 'flex'; // Показываем newWindow, если активно Window1
      } else {
        newWindow.style.display = 'none'; // Скрываем newWindow, если активно Window2
      }
    }
  }, 100); // Задержка для плавного перехода
}


function toggleFilter(element) {
  const filterGroup = element.parentElement;
  const filterOptions = filterGroup.querySelector('.filter-options');

  // Переключение класса "active" для списка опций
  if (filterOptions.style.display === "block") {
      filterOptions.style.display = "none"; // Закрыть
  } else {
      filterOptions.style.display = "block"; // Открыть
  }
}

function validateDates() {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const weekButton = document.getElementById("week");
  const monthButton = document.getElementById("month");
  // Выбираем кнопки Days и Units по id
  const daysButton = document.getElementById('daysButton');
  const unitsButton = document.getElementById('unitsButton');

  const radioButtons = document.querySelectorAll(".radio-options input");

  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

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

  // Активируем или деактивируем radio buttons
  if (startDate && endDate) {
    radioButtons.forEach((button) => (button.disabled = false));
  } else {
    radioButtons.forEach((button) => (button.disabled = true));
  }

    // Активируем или деактивируем кнопки "Days" и "Units"
    if (startDate && endDate) {
      daysButton.disabled = false;
      unitsButton.disabled = false;
    } else {
      daysButton.disabled = true;
      unitsButton.disabled = true;
    }
}

// function setPeriod(period) {
//   const startDate = new Date(localStorage.getItem("startDate"));
//   let start, end;

//   // Удаляем активный класс со всех кнопок
//   document.querySelectorAll(".options button").forEach(button => {
//     button.classList.remove("active");
//   });

//   // Добавляем активный класс к нажатой кнопке
//   if (period === "week") {
//     document.getElementById("week").classList.add("active");
//     // Определяем первый день недели (понедельник)
//     const firstDayOfWeek = new Date(startDate);
//     firstDayOfWeek.setDate(startDate.getDate() - startDate.getDay() + 1);

//     // Если startDate - последний день недели (воскресенье), устанавливаем startDate на предыдущий понедельник
//     if (startDate.getDay() === 0) {
//       start = new Date(startDate);
//       start.setDate(startDate.getDate() - 6);
//     } else {
//       start = firstDayOfWeek;
//     }

//     end = new Date(start);
//     end.setDate(start.getDate() + 6);
//   } else if (period === "month") {
//     document.getElementById("month").classList.add("active");
//     start = new Date(startDate.getFullYear(), startDate.getMonth(), 2);
//     end = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
//   }

//   document.getElementById("startDate").value = start.toISOString().split("T")[0];
//   document.getElementById("endDate").value = end.toISOString().split("T")[0];
// }

function setPeriod(period) {

  const weekButton = document.getElementById("week");
  const monthButton = document.getElementById("month");

  // Сбрасываем активное состояние на обеих кнопках
  weekButton.classList.remove("active");
  monthButton.classList.remove("active");

    // Активируем нажатую кнопку
    if (period === "week") {
      weekButton.classList.add("active");
    } else if (period === "month") {
      monthButton.classList.add("active");
    }

  const startDate = new Date(localStorage.getItem("startDate"));
  let start, end;

  // Удаляем активный класс со всех кнопок
  document.querySelectorAll(".options button").forEach(button => {
    button.classList.remove("active");
  });

  // Добавляем активный класс к нажатой кнопке
  if (period === "week") {

    // Определяем первый день недели (понедельник)
    const firstDayOfWeek = new Date(startDate);
    firstDayOfWeek.setDate(startDate.getDate() - startDate.getDay() + 1);

    // Если startDate - последний день недели (воскресенье), устанавливаем startDate на предыдущий понедельник
    if (startDate.getDay() === 0) {
      start = new Date(startDate);
      start.setDate(startDate.getDate() - 6);
    } else {
      start = firstDayOfWeek;
    }

    end = new Date(start);
    end.setDate(start.getDate() + 6);
  } else if (period === "month") {

    start = new Date(startDate.getFullYear(), startDate.getMonth(), 2);
    end = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
  }

  document.getElementById("startDate").value = start.toISOString().split("T")[0];
  document.getElementById("endDate").value = end.toISOString().split("T")[0];


    // Обновляем localStorage
    localStorage.setItem("startDate", start.toISOString().split("T")[0]);
    localStorage.setItem("endDate", end.toISOString().split("T")[0]);
  
    // Вызываем validateDates для активации/деактивации кнопок
    validateDates();
}



document.getElementById("startDate").addEventListener("change", function () {
  localStorage.setItem("startDate", this.value);
  validateDates();
});

document.getElementById("endDate").addEventListener("change", function () {
  localStorage.setItem("endDate", this.value);
});











// Функция для выбора текущей недели
function selectWeek(input) {
  var date = $(input).datepicker("getDate");
  if (!date) date = new Date();

  // Находим понедельник текущей недели
  var firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 1));

  // Выставляем дату начала и конца недели
  var lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  // Заполняем input с началом и концом недели
  $(input).datepicker("setDate", firstDayOfWeek);
  $("#endDate").datepicker("setDate", lastDayOfWeek);

  // Закрываем datepicker
  $(input).datepicker("hide");
}

// Функция для выбора текущего месяца
function selectMonth(input) {
  var date = $(input).datepicker("getDate");
  if (!date) date = new Date();

  // Находим начало и конец месяца
  var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // Заполняем input с началом и концом месяца
  $(input).datepicker("setDate", firstDayOfMonth);
  $("#endDate").datepicker("setDate", lastDayOfMonth);

  // Закрываем datepicker
  $(input).datepicker("hide");
}










document.getElementById("resetButton").addEventListener("click", function () {
  // Очищаем поля дат
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("endDate").disabled = true;

  // Сбрасываем все чекбоксы
  const checkboxes = document.querySelectorAll("#window1 input[type='checkbox']");
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

  // Деактивируем radio buttons, если есть
  const radioButtons = document.querySelectorAll(".radio-options input");
  radioButtons.forEach((button) => {
    button.disabled = true;
  });

    // Деактивируем кнопки "Days" и "Units"
    document.getElementById('daysButton').disabled = true;
    document.getElementById('unitsButton').disabled = true;

  // Сбрасываем активные классы на кнопках периода
  document.querySelectorAll(".options button").forEach(button => {
    button.classList.remove("active");
  });

    // Удаляем newWindow, если оно существует
    const newWindow = document.getElementById('newWindow');
    if (newWindow) {
      newWindow.remove(); // Удаляем элемент newWindow из DOM
    }
});