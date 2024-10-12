// Функція для обробки зміни дат
export function handleDateChange(
  startDateInput,
  endDateInput,
  weekButton,
  monthButton
) {

  // Обробка startDate
  if (startDateInput.value) {
    

    endDateInput.disabled = false;
    endDateInput.min = startDateInput.value;
    weekButton.disabled = false;
    //weekButton.classList.remove("active");
    monthButton.disabled = false;
    //monthButton.classList.remove("active");
    localStorage.setItem("startDate", startDateInput.value);
  } else {
    endDateInput.disabled = true;
    endDateInput.value = "";
    weekButton.disabled = true;
   // weekButton.classList.remove("active");
    monthButton.disabled = true;
   // monthButton.classList.remove("active");
    localStorage.removeItem("startDate");
  }

  // Обробка endDate
  if (endDateInput.value) {
   // weekButton.classList.remove("active");
   // monthButton.classList.remove("active");
    // Если стартовая дата больше конечной, очищаем endDate
    if (new Date(startDateInput.value) > new Date(endDateInput.value)) {
      endDateInput.value = "";
      localStorage.removeItem("endDate");
    } else {
      localStorage.setItem("endDate", endDateInput.value);
    }
  } else {
    localStorage.removeItem("endDate");
  }

  // Активуємо/деактивуємо кнопку "Days"
  if (startDate && endDate) {
    daysButton.disabled = false;
    localStorage.setItem("daysButtonEnabled", "true");
  } else {
    daysButton.disabled = true;
  }
}

// Ф-ція для процесінгу пре-сетів Week і Month
// Особливості роботи кнопок WEEK і MONTH:
// Коли користувач ввів вперше СтартДейт, то це значення запишеться в  localStorage як initialStartDate
// Коли користувач буде натискати на WEEK і MONTH, саме initialStartDate буде використовуватись для підрахунку меж тижня і місяця
// Тобто при клацанні туди-сюди на WEEK і MONTH завжди буде той самий тиждень і той самий місяць.
// Як тільки користувач руками змінить значення в СтартДейт, то нове значення запишеться в  localStorage як initialStartDate і логіка WEEK і MONTH повториться як описано вище

export function setPeriod(
  button,
  initialStartDate,
  startDateInput,
  endDateInput
) {
  // const weekButton = document.getElementById("week");
  // const monthButton = document.getElementById("month");
  // console.log(weekButton, monthButton);

  //console.log("попали в setPeriod");

  // Знімаємо активний стан кнопок
  // weekButton.classList.remove("active");
  // monthButton.classList.remove("active");

  console.log(button);

  // Отримуємо початкову дату з інпуту або з  localStorage
  let startDate = new Date(
    localStorage.getItem("startDate") || startDateInput.value
  );
  //  let start, end;

  // Це будуть проміжні дати початку і кінця, які ми використаємо для подрахунку тижня і місяця
  let start = new Date(startDate);
  let end = new Date(startDate);

  if (button.id === "week") {
    start = getMonday(initialStartDate);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
  } else if (button.id === "month") {
    // Дуууууже довго не міг зрозуміти чому в цьому рядку start повертає перший день місяця, а на екрані в startDate я бачу останній день попередньго місяця.
    // Гугл підказав додати до конструкції Date.UTC, бо це могло статися через часові пояси. Тепер все Ок.
    start = new Date(Date.UTC(startDate.getFullYear(), initialStartDate.getMonth(), 1));
    end = new Date(Date.UTC(startDate.getFullYear(), initialStartDate.getMonth() + 1, 0));
  }

  // Тут оновимо значення на екрані в полях "startDate" і "endDate" на основі вирахуваних значень у змінних start і end
  startDateInput.value = start.toISOString().split("T")[0];
  endDateInput.value = end.toISOString().split("T")[0];

  // оновлюємо localStorage
  localStorage.setItem("startDate", start.toISOString().split("T")[0]);
  localStorage.setItem("endDate", end.toISOString().split("T")[0]);
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
