// Тут ми перевіримо, чи всі умови виконані для того щоб створити додаткове вікно з результатами розрахунків
// Необхідні умови:
// 1. Заповнені поля startDate і endDate
// 2. Обраний хочаб один тип дня
// 3. Обраний хочаб одна одиниця вимірювання
export function checkAllConditions(
    startDateInput,
    endDateInput,
    daysChecked,
    unitsChecked
  ) {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
  
    if (startDate && endDate && daysChecked && unitsChecked) {
        console.log('ЧЕК ОЛ КОНДІШНС');
      createNewWindow();
    }
  }
  
  // Створюємо нове вікно, в якому ми бумо відображати результати розрахунків
  export function createNewWindow() {
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





  // Це ф-ція, де відбувається весь розрахунок Днів/Годин/Хвили/Секунд між датами
export function updateNewWindow() {
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