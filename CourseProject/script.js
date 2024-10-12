// WINDOW1

// Тут отримуємо значення  initialStartDate з localStorage
// Його ми будемо використовувати для отримання Тижня і Місяця при натисканнях на кнопки Week і Month
// Приклад -Ввели в поле старт -  02.10.2024 - це і буде initialStartDate
// При натискання на кнопку ТИЖДЕЬ, отримаємо календанрий тиждень на екрані по значенню в initialStartDate , тобто:
// Старт = 30.09.2024 - Енд = 06.10.2024
// Тепер при натисканні на кнопку МІСЯЦЬ, отримаємо календарний місяць на основі initialStartDate , тобто:
// startDate = 01.10.2024 - endDate = 31.10.2024
// При ПОВТОРНОМУ натискання на кнопку ТИЖДЕЬ, отримаємо календанрий тиждень на екрані по значенню в initialStartDate , тобто:
// ЗНОВУ startDate = 30.09.2024 - endDate = 06.10.2024

import { handleDateChange } from "./datesHandler.js";
import { setPeriod } from "./datesHandler.js";
import { calculateDateTimeNumber } from "./datetimecalc.js";
// import { createNewWindow } from "./windowcreator.js";
// import { checkAllConditions } from "./windowcreator.js";
// import { updateNewWindow } from "./windowcreator.js";

let initialStartDate = localStorage.getItem("initialStartDate")
  ? new Date(localStorage.getItem("initialStartDate"))
  : null;

document.addEventListener("DOMContentLoaded", () => {
  // Отримуємо дані з DOM ===>
  const datButton = document.getElementById("DAT");
  const holButton = document.getElementById("HOL");

  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  const weekButton = document.getElementById("week");
  const monthButton = document.getElementById("month");

  const unitsButton = document.getElementById("unitsButton");
  const daysButton = document.getElementById("daysButton");

  const daysCheckboxes = document.querySelectorAll(
    '#daysButton + .dropdown-content input[type="checkbox"]'
  );
  const unitsCheckboxes = document.querySelectorAll(
    '#unitsButton + .dropdown-content input[type="checkbox"]'
  );
  const newWindow = document.getElementById("newWindow");
  // Отримуємо дані з DOM <===

  // Відновлюємо значееня з localStorage ===> START

  // Восстанавливаем содержимое newWindow из localStorage, если оно существует
  // const savedContent = localStorage.getItem("newWindowContent");
  // console.log(savedContent);

  // if (newWindow) {
  //   console.log('NEWWINDOWWW');
  //        newWindow.innerHTML = savedContent;

  //   newWindow.style.display = "flex";
  // }

  // if (newWindow) {
  //   updateNewWindow();
  // }




  // if (savedContent) {
  //   newWindow.innerHTML = savedContent;

  //   newWindow.style.display = "flex"; // Показываем окно, если оно было скрыто
  // }

  if (localStorage.getItem("startDate")) {
    startDateInput.value = localStorage.getItem("startDate");
    endDateInput.disabled = false;
    endDateInput.min = startDateInput.value;
    weekButton.disabled = false;
    monthButton.disabled = false;
  }

  if (localStorage.getItem("endDate")) {
    endDateInput.value = localStorage.getItem("endDate");
    weekButton.disabled = false;
    monthButton.disabled = false;
  }

  if (localStorage.getItem("newWindowActive")) {
    const savedContent = localStorage.getItem("newWindowContent");
    const newWindowActive = localStorage.getItem("newWindowActive");
  
    if (savedContent && newWindowActive === "true") {
      let newWindow = document.getElementById("newWindow");
  
      // Если окно newWindow еще не создано, создаем его
      if (!newWindow) {
        newWindow = document.createElement("div");
        newWindow.id = "newWindow";
        newWindow.classList.add("window");
        newWindow.classList.add("active"); // Делаем окно активным
        document.querySelector(".container").appendChild(newWindow);
      }
  
      // Вставляем сохраненное содержимое и показываем окно
      newWindow.innerHTML = savedContent;
      newWindow.style.display = "flex";
    }
  }

  // Восстанавливаем состояние кнопок Week и Month
  if (localStorage.getItem("weekActive") === "true") {
    weekButton.classList.add("active");
    monthButton.classList.remove("active");
  }
  if (localStorage.getItem("monthActive") === "true") {
    weekButton.classList.remove("active");
    monthButton.classList.add("active");
  }

  // ВВідновлюємо стан кнопки Days
  if (localStorage.getItem("daysButtonEnabled") === "true") {
    daysButton.disabled = false;
  }

  // Відновлюємо стан кнопки Units
  if (localStorage.getItem("unitsButtonEnabled") === "true") {
    unitsButton.disabled = false;
  }

  // Відновлюємо стан чекбоксів DAYS
  daysCheckboxes.forEach((checkbox) => {
    const checkboxId = checkbox.id;
    if (localStorage.getItem(checkboxId) === "true") {
      checkbox.checked = true;
    }
  });

  //  Відновлюємо стан чекбоксів UNITS
  unitsCheckboxes.forEach((checkbox) => {
    const checkboxId = checkbox.id;
    if (localStorage.getItem(checkboxId) === "true") {
      checkbox.checked = true;
      unitsButton.disabled = false;
    }
  });

  // Відновлюємо значення з localStorage <=== END

  // Перевіряємо чи відмічений чекбос
  const isChecked = (checkboxes) => {
    return Array.from(checkboxes).some((checkbox) => checkbox.checked);
  };

  // Функция, которая обновляет состояние кнопки unitsButton
  const updateUnitsButtonState = () => {
    const daysChecked = isChecked(daysCheckboxes);
    unitsButton.disabled = !daysChecked; // Активируем кнопку, если хоть один чекбокс отмечен
  };
  // Оновлюємо стан кнопки unitsButton unitsButton при завантаженні сторінки
  updateUnitsButtonState();

  // Функція, яка буде запускатися при перемиканні чекбоксів Units
  const updateOnUnits = () => {
    const daysChecked = isChecked(daysCheckboxes);
    const unitsChecked = isChecked(unitsCheckboxes);
    checkAllConditions(startDateInput, endDateInput, daysChecked, unitsChecked);
  };

  datButton.addEventListener("click", () => {
    switchWindow(1); // Перемикаємось на Window1
    datButton.classList.add("active");
    holButton.classList.remove("active");
  });

  holButton.addEventListener("click", async () => {
    switchWindow(2); // Перемикаємось на Window2
    datButton.classList.remove("active");
    holButton.classList.add("active");
    await fetchCountries();
  });

  startDateInput.addEventListener("change", function () {
    localStorage.setItem("initialStartDate", this.value);
    initialStartDate = new Date(this.value);
    handleDateChange(startDateInput, endDateInput, weekButton, monthButton); // Обрабатываем обе даты
    updateNewWindow(); // Якщо змінили значення startDate, то перераховуємо дні/години/хвилини/секунди у новому вікні
  });

  // Обработка изменения конечной даты
  endDateInput.addEventListener("change", function () {
    handleDateChange(startDateInput, endDateInput, weekButton, monthButton); // Обрабатываем обе даты
  });

  weekButton.addEventListener("click", function () {
    weekButton.classList.add("active");
    monthButton.classList.remove("active");
    setPeriod(weekButton, initialStartDate, startDateInput, endDateInput);
    const newWindow = document.getElementById("newWindow");
    if (newWindow) {
      updateNewWindow(); // Оновлюємо вікно тільки якщо воно активне
    }
    handleDateChange(startDateInput, endDateInput, weekButton, monthButton); // Обрабатываем обе даты
    localStorage.setItem("weekActive", "true"); // Save state to localStorage
    localStorage.setItem("monthActive", "false");
  });

  monthButton.addEventListener("click", function () {
    weekButton.classList.remove("active");
    monthButton.classList.add("active");
    setPeriod(monthButton, initialStartDate, startDateInput, endDateInput);
    const newWindow = document.getElementById("newWindow");
    if (newWindow) {
      updateNewWindow(); // Оновлюємо вікно тільки якщо воно активне
    }
    handleDateChange(startDateInput, endDateInput, weekButton, monthButton); // Обрабатываем обе даты
    localStorage.setItem("monthActive", "true"); // Save state to localStorage
    localStorage.setItem("weekActive", "false");
  });

  // Додамо івентлісенер для чекбоксів Days і повісимо на нього виклик перевірки дат при зміні чекбоксів
  daysCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      if (localStorage.getItem("newWindowActive")) {
        updateNewWindow(); // Оновлюємо вікно тільки якщо воно активне
      }
      updateUnitsButtonState();
      // Сохраняем состояние чекбокса в localStorage
      localStorage.setItem(checkbox.id, checkbox.checked);
    });
  });

  // Додамо івентлісенер для чекбоксів Units і повісимо на нього виклик перевірки дат при зміні чекбоксів
  unitsCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function (event) {
      updateNewWindow(); // Оновлюємо вікно тільки якщо воно активне
      if (unitsButton.disabled) {
        event.preventDefault(); // Не виконуємо дій, якщо кнопка Units не активна ??????????
      } else {
        updateOnUnits();
      } // Тут перевіряємо чи всі умови виконані для запуску додаткового вікна
      // Сохраняем состояние чекбокса в localStorage
      localStorage.setItem(checkbox.id, checkbox.checked);
    });
  });

  // ===> WINDOW2 START
  // Івентлісенер для поля КРАЇНА -> Якщо у нас зроблений вибір країни і року, то робимо запит шоб отримати список свтя
  countrySelect.addEventListener("change", () => {
    if (countrySelect.value && yearSelect.value) {
      console.log("EVENTLISTENR CHANGE OF COUTRY");
      fetchHolidays(countrySelect.value, yearSelect.value);
    }
  });
  // Івентлісенер для поля РІК -> Якщо у нас зроблений вибір країни і року, то робимо запит шоб отримати список свтя
  yearSelect.addEventListener("change", () => {
    if (countrySelect.value && yearSelect.value) {
      console.log("EVENTLISTENR CHANGE OF YEAR");
      fetchHolidays(countrySelect.value, yearSelect.value);
    }
  });
  // <=== WINDOW2 END
});

// Тут ми перевіримо, чи всі умови виконані для того щоб створити додаткове вікно з результатами розрахунків
// Необхідні умови:
// 1. Заповнені поля startDate і endDate
// 2. Обраний хочаб один тип дня
// 3. Обраний хочаб одна одиниця вимірювання
function checkAllConditions(
  startDateInput,
  endDateInput,
  daysChecked,
  unitsChecked
) {
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

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

  newWindow.classList.add("newWindow");

  updateNewWindow();

  // зберігаємо стан активності в localStorage
  localStorage.setItem("newWindowActive", "true");
}

// Перемикач між вікнами
function switchWindow(windowNumber) {
  // Відключаємо всі вікна
  document.querySelectorAll(".window").forEach((window, index) => {
    window.classList.remove("active");
  });

  // Активуємо тільки обране вікно
  document.getElementById(`window${windowNumber}`).classList.add("active");
  // перемикаємся тільки між Window1 і Window2
  document.querySelectorAll(".window").forEach((window, index) => {
    if (index < 2) {
      // перемикаємся тільки між Window1 і Window2
      window.classList.remove("active");
    }
  });

  // Затримка перемикання
  setTimeout(() => {
    document.getElementById(`window${windowNumber}`).classList.add("active");

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
  }, 100); // Затримка перемикання для плавності
}

// Це ф-ція, де відбувається весь розрахунок Днів/Годин/Хвили/Секунд між датами
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
    {
      checked: unitDaysChecked,
      calculate: calculateDateTimeNumber,
      unit: "D",
      label: "days",
    },
    {
      checked: unitHoursChecked,
      calculate: calculateDateTimeNumber,
      unit: "H",
      label: "hours",
    },
    {
      checked: unitMinutesChecked,
      calculate: calculateDateTimeNumber,
      unit: "M",
      label: "minutes",
    },
    {
      checked: unitSecondsChecked,
      calculate: calculateDateTimeNumber,
      unit: "S",
      label: "seconds",
    },
  ];

  if (allDaysChecked) {
    const dayType = "CD";
    units.forEach((unit) => {
      if (unit.checked) {
        const totalValue = unit.calculate(
          startDate,
          endDate,
          dayType,
          unit.unit
        );
        resultHTML += `<li> ${totalValue} <strong>${unit.label}</strong></li>`;
      }
    });
  }

  if (weekdaysChecked) {
    const dayType = "WK";
    units.forEach((unit) => {
      if (unit.checked) {
        const totalValue = unit.calculate(
          startDate,
          endDate,
          dayType,
          unit.unit
        );
        resultHTML += `<li> ${totalValue} week<strong>${unit.label}</strong></li>`;
      }
    });
  }

  if (weekendsChecked) {
    const dayType = "WD";
    units.forEach((unit) => {
      if (unit.checked) {
        const totalValue = unit.calculate(
          startDate,
          endDate,
          dayType,
          unit.unit
        );
        resultHTML += `<li> ${totalValue} weekend<strong>${unit.label}</strong></li>`;
      }
    });
  }

  resultHTML += "</ul>";

  const newWindow = document.getElementById("newWindow");
  if (newWindow) {
    newWindow.innerHTML = resultHTML;
  }

  // зберігаємо вміст newWindow в localStorage
  localStorage.setItem("newWindowContent", resultHTML);
}

// ===> Reset START

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

// <=== Reset END

// WINDOW2

// API KEY: 'Qb4n7h49z7ZdNZ8dWFDhpu4FYDPbv1ck'

const API_KEY = "Qb4n7h49z7ZdNZ8dWFDhpu4FYDPbv1ck";

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
  let countries;

  // Перевіряємо чи ми вже маємо перелік країн  localStorage
  const storedCountries = localStorage.getItem("countries");

  if (storedCountries) {
    // Якщо список країн вже еє в localStorage, то використовуємо його
    countries = JSON.parse(storedCountries);
    populateCountrySelect(countries);
  } else {
    try {
      const response = await axios.get(
        "https://calendarific.com/api/v2/countries",
        {
          params: { api_key: API_KEY },
        }
      );

      countries = response.data.response.countries;
      // Зберігаємо перелік країн в localStorage
      localStorage.setItem("countries", JSON.stringify(countries));
      countries = response.data.response.countries;
      // Заполняем выпадающий список стран
      populateCountrySelect(countries);
    } catch (error) {
      document.getElementById("holidaysTable").innerHTML =
        "<p>Error loadind country list. Please try again later.</p>";
    }
  }
}

// Функція для заповнення випадаючого списка країнами
function populateCountrySelect(countries) {
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country["iso-3166"];
    option.textContent = country.country_name;
    countrySelect.appendChild(option);
  });
}

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
  let holidays;

  // зробимо ключ з Країни+Року для отримання даних з localStorage
  const storageKey = `holidays_${countryCode}_${year}`;

  // Перевіряємо чи вже зберегли список свят в localStorage
  const storedHolidays = localStorage.getItem(storageKey);

  if (storedHolidays) {
    // Використовуємо дані з localStorage, якщо вони там є
    const holidays = JSON.parse(storedHolidays);
    displayHolidays(holidays);
  } else {
    try {
      console.log("Отримую список свят по АРІ");
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
      holidays = response.data.response.holidays;
      // Сохраняем список праздников в localStorage
      localStorage.setItem(storageKey, JSON.stringify(holidays));
      console.log(holidays);

      // Отображаем праздники
      displayHolidays(holidays);
    } catch (error) {
      document.getElementById("holidaysTable").innerHTML =
        "<p>Error loadind golidays. Please try again later.</p>";
    }
  }
}

// Додаєм динамічно HTML для форматування відображення таблиці свят
function displayHolidays(holidays) {
  //    const holidaysTable = document.getElementById("holidaysTable");
  const holidaysTable = document.querySelector(
    "#window2 .right-panel #holidaysTable"
  );
  holidaysTable.innerHTML = `
      <table>
        <thead>
          <tr>
            <th id="dateHeader">Дата<span id="sortIcon">⬇️</span></th>
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

  // Сортуємо по даті
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
    sortIcon.textContent = sortAsc ? "⬇️" : "⬆️";
  });
}
