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

function multiply(a) {
  return function (b) {
    return a * b;
  };
}

console.log(multiply(5)(5)); // 25
console.log(multiply(2)(-2)); // -4
console.log(multiply(4)(3)); // 12

// 3. Напишіть функцію яка буде використовуватись для сортування масиву фільмів

// Функція буде приймати два аргумента:
// — властивість за якою треба посортувати.
// — опцію напрямку сортування (зростання чи спадання)

// const movies = [
// 	{
// 		movieName: 'The Thing',
// 		releaseYear: 1982,
// 		directedBy: 'Carpenter',
// 		runningTimeInMinutes: 109,
// 	},
// 	{
// 		movieName: 'Aliens',
// 		releaseYear: 1986,
// 		directedBy: 'Cameron',
// 		runningTimeInMinutes: 137,
// 	},
// 	{
// 		movieName: 'Men in Black',
// 		releaseYear: 1997,
// 		directedBy: 'Sonnenfeld',
// 		runningTimeInMinutes: 98,
// 	},
// 	{
// 		movieName: 'Predator',
// 		releaseYear: 1987,
// 		directedBy: 'McTiernan',
// 		runningTimeInMinutes: 107,
// 	},
// ];

// console.log(movies.sort(byProperty('releaseYear', '>')));
// // виведе масив фільмів посортованих по року випуску, від старішого до новішого
// console.log(movies.sort(byProperty('runningTimeInMinutes', '<')));
// // виведе масив фільмів посортованих по їх тривалості, від найдовшого до найкоротшого
// console.log(movies.sort(byProperty('movieName', '>')));
// // виведе масив фільмів посортованих по назві, в алфавітному порядку

// function byProperty(property, direction) {
// 	// тут ваш код
// }

const movies = [
  {
    movieName: "The Thing",
    releaseYear: 1982,
    directedBy: "Carpenter",
    runningTimeInMinutes: 109,
  },
  {
    movieName: "Aliens",
    releaseYear: 1986,
    directedBy: "Cameron",
    runningTimeInMinutes: 137,
  },
  {
    movieName: "Men in Black",
    releaseYear: 1997,
    directedBy: "Sonnenfeld",
    runningTimeInMinutes: 98,
  },
  {
    movieName: "Predator",
    releaseYear: 1987,
    directedBy: "McTiernan",
    runningTimeInMinutes: 107,
  },
];

// Тут я не памятаю який спосіб ми розбирали на уроці, тому просто гуглив і дивився різні приклади :D

function byProperty(property, direction) {
  // Запишимо внутрішню ф-цію порівняння. Порівнюватись будуть почергово всі пари елементів масива. Детальніше буде описано на етапі виклику метода sort()
  return function (a, b) {
    if (direction === ">") {
      // Ми сортуємо від більшого до меншого Descending
      // Якщо параметр елементу a більший за параметр елементу b, то повертаємо -1 (що означає що a має бути перед b)
      // інакше повренемо 1 (що означає що   b має бути перед а)
      return a[property] > b[property] ? -1 : 1;
    } else if (direction === "<") {
      // Ми сортуємо від меншого до більшого Ascending
      return a[property] < b[property] ? 1 : -1;
    } else {
      throw new Error('Некоректна опція напряму сортування. Будь-ласка використовуйте ">" or "<".');
    }
  };
}

// Метод масиву sort() самостійно ініціює цикл, в якому передасть пари елементів масиву до ф-ції порівняння " return function(a, b) {" у якості аргументів.
// Приклад: на першій ітерації:
//    а = movieName: 'The Thing', releaseYear: 1982, directedBy: 'Carpenter', runningTimeInMinutes: 109,
//    b =     movieName: 'Aliens', releaseYear: 1986, directedBy: 'Cameron', runningTimeInMinutes: 137,
//        на другій ітерації:
//    а =     movieName: 'Aliens', releaseYear: 1986, directedBy: 'Cameron', runningTimeInMinutes: 137,
//    b =     movieName: 'Men in Black', releaseYear: 1997, directedBy: 'Sonnenfeld', runningTimeInMinutes: 98,
//        на другій ітерації:
//    a =     movieName: 'Men in Black', releaseYear: 1997, directedBy: 'Sonnenfeld', runningTimeInMinutes: 98,
//    b =     movieName: 'Predator', releaseYear: 1987, directedBy: 'McTiernan', runningTimeInMinutes: 107,

console.log(movies.sort(byProperty("releaseYear", ">")));
console.log(movies.sort(byProperty("runningTimeInMinutes", "<")));
console.log(movies.sort(byProperty("movieName", ">")));
