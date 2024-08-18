// 1. Напишіть функцію addThemAll

// Вона буде знаходити суму усіх своїх аргументів незалежно від їх кількості (але без використання вбудованого об'єкту Math).

// Використайте оператор розширення

// console.log(addThemAll(2,4)); // 6
// console.log(addThemAll(1,2,3,4)); // 10
// console.log(addThemAll(5,5,10)); // 20

// function addThemAll // тут пишете свій код

// Створимо ф-цію із використанням оператора spread (...)
// "..." перед іменем параметра arguments означає, що всі аргументі, які ми передаємо у функцію будут зібрані у масив
function addThemAll(...arguments) {
  console.log(arguments); // [.., .., ..]
  // до масиву arguments застосуємо метод reduce, який виконає колбек ф-цію (Акумулятор + Поточне значення елементу масива) для кожного елемента масиву.
  // 0 - це початкове значення акумулятора (accumulator)
  // currentValue - це значення поточного елементу масива.
  // accumulator - це змінна, яка накопичує в собі всі значення елементів масиву.
  // Приклад: для першого елемента масиву accumulator = 0 + значення першого елемента масиву
  //          для другого елемента масиву accumulator = 0 + значення першого елемента масиву + значення другого елемента масиву ітд
  return arguments.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}

console.log(addThemAll(2, 4)); // 6
console.log(addThemAll(1, 2, 3, 4)); // 10
console.log(addThemAll(5, 5, 10)); // 20

// Можемо ускладнити ф-цію з урахуванням того, що не всі аргументи ф-ції будуть числовими

function addThemAll2(...arguments) {
  return arguments.reduce((accumulator, currentValue) => {
    // Якщо тип "currentValue" - нум  і  "currentValue" не NaN
    if (typeof currentValue === "number" && !isNaN(currentValue)) {
      return accumulator + currentValue;
    } else {
      console.warn(`Значення "${currentValue}" не є числовим.`);
      return accumulator;
    }
  }, 0);
}

console.log(addThemAll2(2, "1", [10], 4)); // 6




//  2. Задача на використання замикання. 

//   Напишіть функцію яка працює таким чином: multiply(a)(b)  // a * b

// console.log(multiply(5)(5))		// 25
// console.log(multiply(2)(-2))	        // -4
// console.log(multiply(4)(3))		// 12

// function multiply(a) {
// 	// тут ваш код*
// }
