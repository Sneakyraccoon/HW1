document.addEventListener("DOMContentLoaded", (event) => {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

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
});

function switchWindow(windowNumber) {
  document.querySelectorAll(".window").forEach((window, index) => {
    window.classList.remove("active");
    document.querySelectorAll(".circle")[index].classList.remove("active");
  });
  setTimeout(() => {
    document.getElementById(`window${windowNumber}`).classList.add("active");
    document
      .querySelectorAll(".circle")
      [windowNumber - 1].classList.add("active");
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
}

function setPeriod(period) {
  const startDate = new Date(localStorage.getItem("startDate"));
  let start, end;

  // Удаляем активный класс со всех кнопок
  document.querySelectorAll(".options button").forEach(button => {
    button.classList.remove("active");
  });

  // Добавляем активный класс к нажатой кнопке
  if (period === "week") {
    document.getElementById("week").classList.add("active");
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
    document.getElementById("month").classList.add("active");
    start = new Date(startDate.getFullYear(), startDate.getMonth(), 2);
    end = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
  }

  document.getElementById("startDate").value = start.toISOString().split("T")[0];
  document.getElementById("endDate").value = end.toISOString().split("T")[0];
}

document.getElementById("startDate").addEventListener("change", function () {
  localStorage.setItem("startDate", this.value);
  validateDates();
});

document.getElementById("endDate").addEventListener("change", function () {
  localStorage.setItem("endDate", this.value);
});


$('#rangestart').calendar({
  type: 'date',
  endCalendar: $('#rangeend')
});
$('#rangeend').calendar({
  type: 'date',
  startCalendar: $('#rangestart')
});






$(function () {
  $("#startDate, #endDate").datepicker({
    showButtonPanel: true,  // Показывает стандартные кнопки (Clear и Today)
    beforeShow: function (input, inst) {
      // Добавляем кастомные кнопки после открытия календаря
      setTimeout(function () {
        var buttonPane = $(inst.dpDiv).find(".ui-datepicker-buttonpane");

        // Удаляем, если кнопки уже добавлены, чтобы не дублировать
        if (!buttonPane.find(".ui-datepicker-week").length) {
          // Кнопка для выбора недели
          $("<button>", {
            text: "Week",
            class: "ui-datepicker-week ui-state-default ui-priority-primary ui-corner-all",
            click: function () {
              selectWeek(input);  // Выбор недели
            }
          }).appendTo(buttonPane);
        }

        if (!buttonPane.find(".ui-datepicker-month").length) {
          // Кнопка для выбора месяца
          $("<button>", {
            text: "Month",
            class: "ui-datepicker-month ui-state-default ui-priority-primary ui-corner-all",
            click: function () {
              selectMonth(input);  // Выбор месяца
            }
          }).appendTo(buttonPane);
        }
      }, 1);
    }
  });
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