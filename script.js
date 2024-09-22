// Додаємо обробник подій, який виконується коли весь HTML авантажений (ми впевнені шо всі елементи DOM доступні)

document.addEventListener("DOMContentLoaded", () => {
  // Отримуємо посилання на кнопку з ідентифікатором "toggleButton"
  const button = document.getElementById("toggleButton");
  // Отримуємо посилання на елемент, де буде відображатися повідомлення про останню зміну стану
  const statusMessage = document.getElementById("statusMessage");
  // Отримуємо посилання на елемент "body", щоб змінювати його фо дмнамічно
  const body = document.body;

  // Завантажуємо початковий стан кнопки "toggleButton" з localStorage  Якщо даних немає (ми пеорший раз зайшли на сайт), встановлюємо стан ‘off’ ).
  const savedState = localStorage.getItem("buttonState");
  // Завантажуємо початкове повідомлення 'statusMessage' з localStorage. Якщо даних немає  (ми пеорший раз зайшли на сайт), залишаємо повідомлення порожнім
  const savedMessage = localStorage.getItem("statusMessage");
  // Завантажуємо початковий колір фону з localStorage. Якщо даних немає (ми пеорший раз зайшли на сайт), залишаємо фон білим
  const savedBackground = localStorage.getItem("backgroundColor");

// Виправлення зауваження: Початковий колір тексту забираємо з локал сториджа
  const savedColor = localStorage.getItem("statusColor");

  // Якщо збережений стан кнопки існує в localStorage, встановлюємо його
  if (savedState) {
    button.textContent = savedState;
  }

  // Якщо збережене повідомлення існує, встановлюємо його
  if (savedMessage) {
    statusMessage.textContent = savedMessage;
  }
  // Якщо збережений колір фону існує, встановлюємо його
  if (savedBackground) {
    body.style.backgroundColor = savedBackground;
  }

  // Виправлення зауваження: Початковий колір тексту забираємо з локал сториджа
  if (savedColor) {
    statusMessage.style.color = savedColor;
  }

  // Додаємо івент лісенер для кнопки, який виконується при натисканні
  button.addEventListener("click", () => {
    const currentTime = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Змінюємо стан кнопки та фон сторінки в залежності від поточного стану кнопки
    // if (button.textContent === "Turn off") {
    //   button.textContent = "Turn on";
    //   body.style.backgroundColor = "#000000";
    //   statusMessage.textContent = `Last turn off: ${currentTime}`;
    // } else {
    //   button.textContent = "Turn off";
    //   body.style.backgroundColor = "#ffffff";
    //   statusMessage.textContent = `Last turn on: ${currentTime}`;
    // }

    if (button.textContent === "Turn off") {
        button.textContent = "Turn on";
        body.style.backgroundColor = "#000000";
        statusMessage.textContent = `Last turn off: ${currentTime}`;
        statusMessage.style.color = "#ffffff";
      } else {
        button.textContent = "Turn off";
        body.style.backgroundColor = "#ffffff";
        statusMessage.textContent = `Last turn on: ${currentTime}`;
        statusMessage.style.color = "#000000";
      }

    // Зберігаємо новий стан кнопки, повідомлення і колвр  в localStorage
    localStorage.setItem("buttonState", button.textContent);
    localStorage.setItem("statusMessage", statusMessage.textContent);
    localStorage.setItem("backgroundColor", body.style.backgroundColor);
    // Виправлення зауваження: Для того щоб колір тексту не мінявся після перезавантаження сторінки, додамо його в локал сторидж
    localStorage.setItem("statusColor", statusMessage.style.color);
  });
});
