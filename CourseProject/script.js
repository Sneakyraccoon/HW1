document.addEventListener("DOMContentLoaded", (event) => {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const daysCheckboxes = document.querySelectorAll(
    '.dropdown-content input[type="checkbox"]:not([id^="extraOption"])'
  );
  const unitsButton = document.getElementById("unitsButton");
  const daysButton = document.getElementById("daysButton");

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

  // Добавляем обработчики событий для чекбоксов Days
  daysCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      // Проверяем, выбран ли хотя бы один чекбокс в Days
      const isAnyDayChecked = Array.from(daysCheckboxes).some(
        (cb) => cb.checked
      );

      // Активируем или деактивируем кнопку Units на основе выбора Days
      unitsButton.disabled = !isAnyDayChecked;
    });
  });
});

// Проверка всех условий для создания нового окна
function checkAllConditions() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const daysChecked =
    document.querySelectorAll(
      '.dropdown-content input[type="checkbox"]:not([id^="extraOption"]):checked'
    ).length > 0;
  const unitsChecked =
    document.querySelectorAll(
      '.dropdown-content input[id^="extraOption"]:checked'
    ).length > 0;

  if (startDate && endDate && daysChecked && unitsChecked) {
    createNewWindow();
  }
}

// Создание нового окна справа от Window1
function createNewWindow() {
  // Проверяем, существует ли уже новое окно, чтобы не создавать повторно
  if (document.getElementById("newWindow")) return;

  // Создаем новый элемент для окна
  const newWindow = document.createElement("div");
  newWindow.id = "newWindow";
  newWindow.classList.add("window");
  newWindow.innerHTML = "<p>New Window</p>";

  // Добавляем новое окно в контейнер
  const container = document.querySelector(".container");
  container.appendChild(newWindow);

  // Применяем стили для нового окна
  newWindow.style.position = "absolute";
  newWindow.style.left = "60vw"; // Справа от Window1
  newWindow.style.top = "50px"; // Тот же отступ сверху, что и у Window1
  newWindow.style.width = "50vw"; // Тот же размер по ширине
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

function toggleFilter(element) {
  const filterGroup = element.parentElement;
  const filterOptions = filterGroup.querySelector(".filter-options");

  // Переключение класса "active" для списка опций
  if (filterOptions.style.display === "block") {
    filterOptions.style.display = "none"; // Закрыть
  } else {
    filterOptions.style.display = "block"; // Открыть
  }
}


function getMonday(date) {
  // Создаем копию даты, чтобы не изменять исходную
  const monday = new Date(date);

  // Получаем текущий день недели (0 - воскресенье, 1 - понедельник, ..., 6 - суббота)
  const day = monday.getDay();

  // Если это воскресенье (day === 0), перемещаем на 6 дней назад, чтобы получить понедельник.
  // В противном случае - просто смещаем на количество дней до понедельника.
  const diff = (day === 0 ? -6 : 1) - day;

  // Вычитаем разницу из даты
  monday.setDate(date.getDate() + diff);
  
  return monday;
}

function validateDates() {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const weekButton = document.getElementById("week");
  const monthButton = document.getElementById("month");
  // Выбираем кнопки Days и Units по id
  const daysButton = document.getElementById("daysButton");
  // const unitsButton = document.getElementById('unitsButton');

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



  // Активируем или деактивируем кнопки "Days" и "Units"
  if (startDate && endDate) {
    daysButton.disabled = false;
    unitsButton.disabled = false;
  } else {
    daysButton.disabled = true;
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

  // Сбрасываем активное состояние на обеих кнопках
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
  let end = new Date(startDate);   // Initialize similarly

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
    start = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), 1));
    end = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth() + 1, 0));


    // Вызываем validateDates для активации/деактивации кнопок
    validateDates();
  }


  // Тут оновимо значення на екрані в полях "startDate" і "endDate" на основі вирахуваних значень у змінних start і end
  document.getElementById("startDate").value = start.toISOString().split("T")[0];
  document.getElementById("endDate").value = end.toISOString().split("T")[0];

      // Обновляем localStorage
      localStorage.setItem("startDate", start.toISOString().split("T")[0]);
      localStorage.setItem("endDate", end.toISOString().split("T")[0]);
  
}

document.getElementById("startDate").addEventListener("change", function () {
  localStorage.setItem("startDate", this.value);
  validateDates();
});

document.getElementById("endDate").addEventListener("change", function () {
  localStorage.setItem("endDate", this.value);
});





document.getElementById("resetButton").addEventListener("click", function () {
  // Очищаем поля дат
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("endDate").disabled = true;

  // Сбрасываем все чекбоксы
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

  // Деактивируем radio buttons, если есть
  const radioButtons = document.querySelectorAll(".radio-options input");
  radioButtons.forEach((button) => {
    button.disabled = true;
  });

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
