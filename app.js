// 1. Напишіть функцію detonatorTimer(delay) використовуючи setInterval

// Вона виводить в консоль число кожну секунду, починаючи з delay (ціле число) і в кінці замість 0 виведе 'BOOM!'

// detonatorTimer(3);
// // 3
// // 2
// // 1
// // BOOM!

// detonatorTimer(delay) {
// 	// тут ваш код
// }

function detonatorTimer(delay) {
  // Встановим поточне значення = аргументу ф-ції
  let currVal = delay;
  // За допомогою ф-ції setInterval змусимо наступний код виконуватись кожні 1000мс
  const intervalId = setInterval(() => {
    // Якщо поточне значення > 0
    if (currVal > 0) {
      // Виводимо в консоль поточне значення
      console.log(currVal);
      // Зменшуємо поточне значення на 1.
      currVal--;
    } else {
      //Поточне значення <= 0 - Виводимо в консоль "BOOM!"
      console.log("BOOM!");
      // За допомогою clearInterval ми якби виходимо з ф-ції
      clearInterval(intervalId);
    }
  }, 1000);
}

detonatorTimer(20);