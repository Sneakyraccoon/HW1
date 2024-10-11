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

import { handleDateChange } from './datesHandler.js';
import { setPeriod } from './datesHandler.js';

let initialStartDate = localStorage.getItem("initialStartDate")
  ? new Date(localStorage.getItem("initialStartDate"))
  : null;

document.addEventListener("DOMContentLoaded", () => {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  const weekButton = document.getElementById("week");
  const monthButton = document.getElementById("month");

  const unitsButton = document.getElementById("unitsButton");
  const daysButton = document.getElementById("daysButton");

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
    createNewWindow();
  }

  const getCheckboxes = (buttonId) => {
    return document.querySelectorAll(
      `#${buttonId} + .dropdown-content input[type="checkbox"]`
    );
  };

  const isChecked = (checkboxes) => {
    return Array.from(checkboxes).some((checkbox) => checkbox.checked);
  };

  const daysCheckboxes = getCheckboxes("daysButton");
  const unitsCheckboxes = getCheckboxes("unitsButton");


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
  
    // ВВідновлюємо стан кнопки Days
    if (localStorage.getItem("daysButtonEnabled") === "true") {
      daysButton.disabled = false;
    }
  
    // Відновлюємо стан кнопки Units
    if (localStorage.getItem("unitsButtonEnabled") === "true") {
      unitsButton.disabled = false;
    }
  
   // Восстанавливаем состояние кнопок Week и Month
    if (localStorage.getItem("weekActive") === "true") {
      weekButton.classList.add("active");
    }
    if (localStorage.getItem("monthActive") === "true") {
      monthButton.classList.add("active");
    }

  // Функция, которая обновляет состояние кнопки unitsButton
  const updateUnitsButtonState = () => {
    const daysChecked = isChecked(daysCheckboxes);
    unitsButton.disabled = !daysChecked; // Активируем кнопку, если хоть один чекбокс отмечен
  };

  // Обновляем состояние кнопки unitsButton при загрузке страницы
  updateUnitsButtonState();

  // Функція, яка буде перевіряти стани всіх чекбоксів
  const updateOnUnits = () => {
    const daysChecked = isChecked(daysCheckboxes);
    const unitsChecked = isChecked(unitsCheckboxes);
    checkAllConditions(startDateInput, endDateInput, daysChecked, unitsChecked);
  };


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
    setPeriod(weekButton, initialStartDate);
    const newWindow = document.getElementById("newWindow");
    if (newWindow && newWindow.style.display === "flex") {
      updateNewWindow(); // Оновлюємо вікно тільки якщо воно активне
    }
    handleDateChange(startDateInput, endDateInput, weekButton, monthButton); // Обрабатываем обе даты
    updateNewWindow(); // Якщо змінили значення startDate, то перераховуємо дні/години/хвилини/секунди у новому вікні
    localStorage.setItem("weekActive", "true"); // Save state to localStorage
    localStorage.setItem("monthActive", "false");
  });


  document.getElementById("month").addEventListener("click", function () {
    // console.log("попали в лисенер монс");
    setPeriod(monthButton, initialStartDate);
    const newWindow = document.getElementById("newWindow");
    if (newWindow && newWindow.style.display === "flex") {
      updateNewWindow(); // Оновлюємо вікно тільки якщо воно активне
    }
  });


  monthButton.addEventListener("click", function () {
    setPeriod(monthButton, initialStartDate);
    const newWindow = document.getElementById("newWindow");
    if (newWindow && newWindow.style.display === "flex") {
      updateNewWindow(); // Оновлюємо вікно тільки якщо воно активне
    }
    handleDateChange(startDateInput, endDateInput, weekButton, monthButton); // Обрабатываем обе даты
    updateNewWindow(); // Якщо змінили значення startDate, то перераховуємо дні/години/хвилини/секунди у новому вікні
    localStorage.setItem("monthActive", "true"); // Save state to localStorage
    localStorage.setItem("weekActive", "false");
  });

  // Відновлюємо значення з localStorage ====> START


  if (localStorage.getItem("newWindowActive")) {
    createNewWindow();
  }

  // Відновлюємо значення з localStorage <==== END

  // Додамо івентлісенер для чекбоксів Days і повісимо на нього виклик перевірки дат при зміні чекбоксів
  daysCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      updateNewWindow();
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
});





// Тут ми перевіримо, чи всі умови виконані для того щоб створити додаткове вікно з результатами розрахунків
// Необхідні умови:
// 1. Заповнені поля startDate і endDate
// 2. Обраний хочаб один тип дня
// 3. Обраний хочаб одна одиниця вимірювання
function checkAllConditions( startDateInput, endDateInput, daysChecked, unitsChecked) {
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

  // Сохраняем состояние в localStorage
  localStorage.setItem("newWindowActive", "true");
}

// Перемикач між вікнами
async function switchWindow(windowNumber) {
  // перемикаємся тільки між Window1 і Window2
  document.querySelectorAll(".window").forEach((window, index) => {
    if (index < 2) {
      // перемикаємся тільки між Window1 і Window2
      window.classList.remove("active");
      document.querySelectorAll(".circle")[index].classList.remove("active");
    }
  });

  // Затримка перемикання
  setTimeout(async() => {
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
    // Звертаємось до АРІ за списком країн лише коли активне вікно 2
    if (windowNumber === 2 && !countrySelect.hasChildNodes()) {
          
    if (windowNumber === 2 && !countrySelect.hasChildNodes()) {
     
      await fetchCountries(); // Асинхронный запрос
    }
    }
  }, 100); // Затримка перемикання
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

  console.log('unitHoursChecked', unitHoursChecked);

  // Додаємо заголовок з датами
  let resultHTML = `<h2 class="result-title">Between ${startDate} and ${endDate}:</h2><ul class="result-list">`;

  // Зробим обєкт з одиницями вимірювання і їх відповідної функції розрахунку
  const units = [
    { checked: unitDaysChecked, calculate: calculateDays, label: "days" },
    { checked: unitHoursChecked, calculate: calculateHours, label: "hours" },
    { checked: unitMinutesChecked, calculate: calculateMinutes, label: "minutes",},
    { checked: unitSecondsChecked, calculate: calculateSeconds, label: "seconds",},
  ];

  if (allDaysChecked) {
    const dayType = "CD";
    units.forEach((unit) => {
      if (unit.checked) {
        const totalValue = unit.calculate(startDate, endDate, dayType);
        resultHTML += `<li> ${totalValue} <strong>${unit.label}</strong></li>`;
      }
    });
  }

  if (weekdaysChecked) {
    const dayType = "WK";
    units.forEach((unit) => {
      if (unit.checked) {
        const totalValue = unit.calculate(startDate, endDate, dayType);
        resultHTML += `<li> ${totalValue} week<strong>${unit.label}</strong></li>`;
      }
    });
  }

  if (weekendsChecked) {
    const dayType = "WD";
    units.forEach((unit) => {
      if (unit.checked) {
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

// document.getElementById("allDays").addEventListener("change", updateNewWindow);
// document.getElementById("weekDays").addEventListener("change", updateNewWindow);
// document.getElementById("weekEnds").addEventListener("change", updateNewWindow);

// document.getElementById("days").addEventListener("change", updateNewWindow);
// document.getElementById("hours").addEventListener("change", updateNewWindow);
// document.getElementById("minutes").addEventListener("change", updateNewWindow);
// document.getElementById("seconds").addEventListener("change", updateNewWindow);

document.getElementById("endDate").addEventListener("change", function () {
  //console.log("Попали в івентлисенер ЕндДейт");
  localStorage.setItem("endDate", this.value);

  updateNewWindow(); // Оновлюємо вікно тільки якщо воно активне
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

//checkAllConditions();

// WINDOW2

// API KEY: 'QBU9fmsfhOjN41RGVjOMuvSh86PP93Fk'

// const API_KEY = "Gr2z94IRJyzgU5JFjzGl1QStorZdpPit";

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

  //await fetchCountries();

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
