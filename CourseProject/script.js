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

  document.getElementById("startDate").value = start
    .toISOString()
    .split("T")[0];
  document.getElementById("endDate").value = end.toISOString().split("T")[0];
}

document.getElementById("startDate").addEventListener("change", function () {
  localStorage.setItem("startDate", this.value);
  validateDates();
});

document.getElementById("endDate").addEventListener("change", function () {
  localStorage.setItem("endDate", this.value);
});
