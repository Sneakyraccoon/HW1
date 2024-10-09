// WINDOW1

document.addEventListener("DOMContentLoaded", () => {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  const daysCheckboxes = document.querySelectorAll(
    '#daysButton + .dropdown-content input[type="checkbox"]'
  );
  const unitsCheckboxes = document.querySelectorAll(
    '#unitsButton + .dropdown-content input[type="checkbox"]'
  );

  const unitsButton = document.getElementById("unitsButton");
  const daysButton = document.getElementById("daysButton");

  const daysDropdownContent = daysButton.nextElementSibling;
  const unitsDropdownContent = unitsButton.nextElementSibling;

  // Відновлюємо значення з localStorage ====> START
  if (localStorage.getItem("startDate")) {
    startDateInput.value = localStorage.getItem("startDate");
    endDateInput.disabled = false;
    endDateInput.min = startDateInput.value;
  }

  if (localStorage.getItem("endDate")) {
    endDateInput.value = localStorage.getItem("endDate");
  }

  // Восстанавливаем состояние чекбоксов days
  daysCheckboxes.forEach((checkbox) => {
    const checkboxId = checkbox.id;
    if (localStorage.getItem(checkboxId) === "true") {
      checkbox.checked = true;
    }
  });

  // Восстанавливаем состояние чекбоксов units
  unitsCheckboxes.forEach((checkbox) => {
    const checkboxId = checkbox.id;
    if (localStorage.getItem(checkboxId) === "true") {
      checkbox.checked = true;
    }
  });

    // Восстанавливаем состояние newWindow из localStorage
    if (localStorage.getItem("newWindowActive")) {
      createNewWindow();
    }
  // Відновлюємо значення з localStorage <==== END

  // Додамо івентлісенер для чекбоксів Days і повісимо на нього виклик перевірки дат при зміні чекбоксів
  daysCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
       validateDates();
      // Сохраняем состояние чекбокса в localStorage
      localStorage.setItem(checkbox.id, checkbox.checked);
    });
  });

  // Додамо івентлісенер для чекбоксів Units і повісимо на нього виклик перевірки дат при зміні чекбоксів
  unitsCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function (event) {
      if (unitsButton.disabled) {
        event.preventDefault(); // Не виконуємо дій, якщо кнопка Units не активна ??????????
      } else {
        checkAllConditions();
      } // Тут перевіряємо чи всі умови виконані для запуску додаткового вікна
      // Сохраняем состояние чекбокса в localStorage
      localStorage.setItem(checkbox.id, checkbox.checked);
    });
  });

  validateDates();
});

// Тут ми перевіримо, чи всі умови виконані для того щоб створити додаткове вікно з результатами розрахунків
// Необхідні умови:
// 1. Заповнені поля startDate і endDate
// 2. Обраний хочаб один тип дня
// 3. Обраний хочаб одна одиниця вимірювання
function checkAllConditions() {
  console.log("Попали в ЧекОлКондишнс");
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

  newWindow.classList.add('newWindow');

  updateNewWindow();

    // Сохраняем состояние в localStorage
    localStorage.setItem("newWindowActive", "true");
}

// Перемикач між вікнами
function switchWindow(windowNumber) {
  // перемикаємся тільки між Window1 і Window2
  document.querySelectorAll(".window").forEach((window, index) => {
    if (index < 2) {
      // перемикаємся тільки між Window1 і Window2
      window.classList.remove("active");
      document.querySelectorAll(".circle")[index].classList.remove("active");
    }
  });

  // Затримка перемикання
  setTimeout(() => {
    document.getElementById(`window${windowNumber}`).classList.add("active");
    document
      .querySelectorAll(".circle")
      [windowNumber - 1].classList.add("active");

    // Вікно з розрахунками треба показати тільки коли ВІНДОВ1 активне, а коли ВІНДОВ2 активне, НОВЕВІКНО треба сховати
    const newWindow = document.getElementById("newWindow");
    if (newWindow) {
      if (windowNumber === 1) {
        newWindow.style.display = "flex"; // Показуєм newWindow, якщо активно Window1
        localStorage.setItem("newWindowActive", "true"); // Сохранение состояния
      } else {
        newWindow.style.display = "none"; // Ховаєм newWindow, якщо активно Window2
        localStorage.setItem("newWindowActive", "false"); // Сохранение состояния
      }
    }
  }, 100); // Затримка перемикання
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
  console.log("Попали в валидейтДейтс");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const weekButton = document.getElementById("week");
  const monthButton = document.getElementById("month");

  const daysButton = document.getElementById("daysButton");
  // const unitsButton = document.getElementById('unitsButton');

  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  const daysChecked =
    document.querySelectorAll(
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

  console.log("Попали в валидейтДейтс - проверка дат");
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

// Особливості роботи кнопок WEEK і MONTH:
// Коли користувач ввів вперше СтартДейт, то це значення запишеться в  localStorage як initialStartDate
// Коли користувач буде натискати на WEEK і MONTH, саме initialStartDate буде використовуватись для підрахунку меж тижня і місяця
// Тобто при клацанні туди-сюди на WEEK і MONTH завжди буде той самий тиждень і той самий місяць.
// Як тільки користувач руками змінить значення в СтартДейт, то нове значення запишеться в  localStorage як initialStartDate і логіка WEEK і MONTH повториться як описано вище

function setPeriod(period) {
  const weekButton = document.getElementById("week");
  const monthButton = document.getElementById("month");

  console.log("попали в setPeriod");

  // Знімаємо активний стан кнопок
  weekButton.classList.remove("active");
  monthButton.classList.remove("active");

  // Отримуємо початкову дату з інпуту або з  localStorage
  let startDate = new Date(
    localStorage.getItem("startDate") ||
      document.getElementById("startDate").value
  );
  //  let start, end;

  // Це будуть проміжні дати початку і кінця, які ми використаємо для подрахунку тижня і місяця
  let start = new Date(startDate);
  let end = new Date(startDate);

  // Удаляем активный класс со всех кнопок
  document.querySelectorAll(".options button").forEach((button) => {
    button.classList.remove("active");
  });

  // Активуємо кнопки
  if (period === "week") {
    // Активуємо натиснену кнопку
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

function calculateDays(startDate, endDate, dayType) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let totalDays = 0;

  // Функція поверне ТРУ, якщо день є буднім (Пн-Пт) (Виклик ф-ції відбуденться нижче в else if (dayType === 'WK')
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  // Функція поверне ТРУ, якщо день є вихідним (Сб/Нд) (Виклик ф-ції відбуденться нижче в else if (dayType === 'WD')
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  for (
    let currentDate = new Date(start);
    currentDate <= end;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    if (dayType === "CD") {
      // Тут просто підраховуємо всі дні без додаткових умов
      totalDays++;
    } else if (dayType === "WK" && isWeekday(currentDate)) {
      // Підраховуємо лише будні
      totalDays++;
    } else if (dayType === "WD" && isWeekend(currentDate)) {
      // Підраховуємо лише вихідні
      totalDays++;
    }
  }

  return totalDays;
}

function calculateWeekdays(startDate, endDate) {
  let count = 0;
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const day = currentDate.getDay();
    if (day !== 0 && day !== 6) {
      // Будние дни (Пн-Пт)
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
    if (day === 0 || day === 6) {
      // Выходные (Сб-Вс)
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return count;
}

function calculateHours(startDate, endDate, dayType) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let totalHours = 0;

  // Чи день будній?
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 - НД, 6 - СБ
  };

  // Чи день вихідни1?
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  for (
    let currentDate = new Date(start);
    currentDate <= end;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    if (dayType === "CD") {
      // Рахуємо всі години (24 за кожен день)
      totalHours += 24;
    } else if (dayType === "WK" && isWeekday(currentDate)) {
      // Рахуємо тільки години будніх днів (24 за кожен  будній день)
      totalHours += 24;
    } else if (dayType === "WD" && isWeekend(currentDate)) {
      // Рахуємо тільки години вихідних днів (24 за кожен  вихідний день)
      totalHours += 24;
    }
  }

  return totalHours;
}

function calculateMinutes(startDate, endDate, dayType) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let totalMinutes = 0;

  // Чи день будній?
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 - НД, 6 - СБ
  };

  // Чи день вихідни1?
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  for (
    let currentDate = new Date(start);
    currentDate <= end;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    if (dayType === "CD") {
      // Рахуємо всі години (24 за кожен день)
      totalMinutes += 1440;
    } else if (dayType === "WK" && isWeekday(currentDate)) {
      // Рахуємо тільки години будніх днів (24 за кожен  будній день)
      totalMinutes += 1440;
    } else if (dayType === "WD" && isWeekend(currentDate)) {
      // Рахуємо тільки години вихідних днів (24 за кожен  вихідний день)
      totalMinutes += 1440;
    }
  }

  return totalMinutes;
}

function calculateSeconds(startDate, endDate, dayType) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let totalSeconds = 0;

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  for (
    let currentDate = new Date(start);
    currentDate <= end;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    if (dayType === "CD") {
      totalSeconds += 86400;
    } else if (dayType === "WK" && isWeekday(currentDate)) {
      totalSeconds += 86400;
    } else if (dayType === "WD" && isWeekend(currentDate)) {
      totalSeconds += 86400;
    }
  }

  return totalSeconds;
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

  // Додаємо заголовок з датами
  let resultHTML = `<h2 class="result-title">Between ${startDate} and ${endDate}:</h2><ul class="result-list">`;

  // Зробим обєкт з одиницями вимірювання і їх відповідної функції розрахунку
  const units = [
    { checked: unitDaysChecked, calculate: calculateDays, label: "days" },
    { checked: unitHoursChecked, calculate: calculateHours, label: "hours" },
    {
      checked: unitMinutesChecked,
      calculate: calculateMinutes,
      label: "minutes",
    },
    {
      checked: unitSecondsChecked,
      calculate: calculateSeconds,
      label: "seconds",
    },
  ];

  if (allDaysChecked) {
    const dayType = "CD";
    units.forEach((unit) => {
      if (unit.checked) {
        console.log("UNIT", unit);
        const totalValue = unit.calculate(startDate, endDate, dayType);
        resultHTML += `<li> ${totalValue} <strong>${unit.label}</strong></li>`;
      }
    });
  }

  if (weekdaysChecked) {
    const dayType = "WK";
    units.forEach((unit) => {
      if (unit.checked) {
        console.log("UNIT", unit);
        const totalValue = unit.calculate(startDate, endDate, dayType);
        resultHTML += `<li> ${totalValue} week<strong>${unit.label}</strong></li>`;
      }
    });
  }

  if (weekendsChecked) {
    const dayType = "WD";
    units.forEach((unit) => {
      if (unit.checked) {
        console.log("UNIT", unit);
        const totalValue = unit.calculate(startDate, endDate, dayType);
        resultHTML += `<li> ${totalValue} weekend<strong>${unit.label}</strong></li>`;
      }
    });
  }

  resultHTML += "</ul>";

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

document.getElementById("startDate").addEventListener("change", function () {
  console.log("Попали в івентлисенер СтартДейт");
  localStorage.setItem("startDate", this.value);
  validateDates();
  updateNewWindow(); // Оновлюємо вікно тільки якщо воно активне
});

document.getElementById("endDate").addEventListener("change", function () {
  console.log("Попали в івентлисенер ЕндДейт");
  localStorage.setItem("endDate", this.value);
  validateDates();
  updateNewWindow(); // Оновлюємо вікно тільки якщо воно активне
});

document.getElementById("week").addEventListener("click", function () {
  console.log("попали в лисенер вик");
  setPeriod("week");
  const newWindow = document.getElementById("newWindow");
  if (newWindow && newWindow.style.display === "flex") {
    updateNewWindow(); // Оновлюємо вікно тільки якщо воно активне
  }
});

document.getElementById("month").addEventListener("click", function () {
  console.log("попали в лисенер монс");
  setPeriod("month");
  const newWindow = document.getElementById("newWindow");
  if (newWindow && newWindow.style.display === "flex") {
    updateNewWindow(); // Оновлюємо вікно тільки якщо воно активне
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

  // Чичтимо localStorage
  localStorage.clear();

  // деактивуємо кнопки "Week" и "Month"
  document.getElementById("week").disabled = true;
  document.getElementById("month").disabled = true;

  // прибираємо активність з кнопок "Week" и "Month"
  document.getElementById("week").classList.remove("active");
  document.getElementById("month").classList.remove("active");

  // декативуємо кнопки "Days" и "Units"
  document.getElementById("daysButton").disabled = true;
  document.getElementById("unitsButton").disabled = true;

  // деактивуємо опції періодів
  document.querySelectorAll(".options button").forEach((button) => {
    button.classList.remove("active");
  });

  // Видаляємо newWindow, якщо воно існувало
  const newWindow = document.getElementById("newWindow");
  if (newWindow) {
    newWindow.remove(); // видаляємо елемент newWindow з DOM
  }
});

checkAllConditions();

// WINDOW2

// API KEY: 'QBU9fmsfhOjN41RGVjOMuvSh86PP93Fk'

const API_KEY = "Gr2z94IRJyzgU5JFjzGl1QStorZdpPit";

document.addEventListener("DOMContentLoaded", async () => {
  const countrySelect = document.getElementById("countrySelect");
  const yearSelect = document.getElementById("yearSelect");

  // Нам трема створити опції по вибору років з 2001 по 2049. Зробимо це в лупі від 2001 до 20049
  // і за допомогою стандартного методу document.createElement додамо кожну опцію в HTML
  const currentYear = new Date().getFullYear();
  for (let year = 2001; year <= 2049; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
  yearSelect.value = currentYear;

  // Отримуємо список країн по АПІ
  async function fetchCountries() {
    try {
      const response = await axios.get(
        "https://calendarific.com/api/v2/countries",
        {
          params: { api_key: API_KEY },
        }
      );
      const countries = response.data.response.countries;
      countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country["iso-3166"];
        option.textContent = country.country_name;
        countrySelect.appendChild(option);
      });
    } catch (error) {
      document.getElementById("holidaysTable").innerHTML =
        "<p>Error loadind country list. Please try again later.</p>";
    }
  }

  // Завантажуємо список країн з АПІшки
  await fetchCountries();

  // Тут реалізуємо логіку активації/деактивації поля вибору року за умови якщо ми обрали країну
  countrySelect.addEventListener("change", () => {
    if (countrySelect.value) {
      yearSelect.disabled = false;
    } else {
      yearSelect.disabled = true;
    }
  });

  // Тут отримаємо список свят
  async function fetchHolidays(countryCode, year) {
    try {
      const response = await axios.get(
        "https://calendarific.com/api/v2/holidays",
        {
          params: {
            api_key: API_KEY,
            country: countryCode,
            year: year,
          },
        }
      );
      displayHolidays(response.data.response.holidays);
    } catch (error) {
      document.getElementById("holidaysTable").innerHTML =
        "<p>Error loadind golidays. Please try again later.</p>";
    }
  }

  // Додаєм динамічно HTML для форматування відображення таблиці свят
  function displayHolidays(holidays) {
    const holidaysTable = document.getElementById("holidaysTable");
    holidaysTable.innerHTML = `
      <table>
        <thead>
          <tr>
            <th id="dateHeader">Дата</th>
            <th>HOliday</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
    const tbody = holidaysTable.querySelector("tbody");
    holidays.forEach((holiday) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${new Date(
        holiday.date.iso
      ).toLocaleDateString()}</td><td>${holiday.name}</td>`;
      tbody.appendChild(row);
    });

    // Сортуємо по даті ДОПИСАТИ СОРТУВАННЯ В ТАБЛИЦІ!!!!!!!!!!!!!!!!!!
    let sortAsc = true;
    document.getElementById("dateHeader").addEventListener("click", () => {
      const rowsArray = Array.from(tbody.querySelectorAll("tr"));
      rowsArray.sort((a, b) => {
        const dateA = new Date(a.cells[0].textContent);
        const dateB = new Date(b.cells[0].textContent);
        return sortAsc ? dateA - dateB : dateB - dateA;
      });
      rowsArray.forEach((row) => tbody.appendChild(row));
      sortAsc = !sortAsc;
    });
  }

  // Івентлісенер для поля КРАЇНА -> Якщо у нас зроблений вибір країни і року, то робимо запит шоб отримати список свтя
  countrySelect.addEventListener("change", () => {
    if (countrySelect.value && yearSelect.value) {
      fetchHolidays(countrySelect.value, yearSelect.value);
    }
  });
  // Івентлісенер для поля РІК -> Якщо у нас зроблений вибір країни і року, то робимо запит шоб отримати список свтя
  yearSelect.addEventListener("change", () => {
    if (countrySelect.value && yearSelect.value) {
      fetchHolidays(countrySelect.value, yearSelect.value);
    }
  });
});
