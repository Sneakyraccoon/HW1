/*
1. Задача про рекурсію 

Напишіть функцію яка рекурсивно буде знаходити суму всіх непарних додатніх чисел до якогось числа.

Приклад:

function recursiveOddSumTo(number) {

// тут ваш код

};

console.log(recursiveOddSumTo(1)) // 1
console.log(recursiveOddSumTo(10)) // 25
*/

// Попросимо користувача ввести число від 0 до 100
let value = prompt("Please enter an integer from 0 to 100", 0);

// Перетворимо значення, яке ввів користувач, щоб точно отримати намбер
value = Number.parseInt(Value, 10);

// Якщо користувач ввів не намбер (NaN) - видамо повідомлення
if (isNaN(value)) {
    alert("Таке чуство шо Бог десь наказує нас за шось");
  }

  console.log(value);




  function sumOddNumbers(n) {
      // тут ваш код
    // Базовый случай: если n меньше 1, возвращаем 0
    if (n < 1) {
        return 0;
    }

    // Проверяем, является ли n непарным числом
    const isOdd = n % 2 !== 0;

    // Если непарное, добавляем его к сумме оставшихся чисел
    // Если парное, просто продолжаем с предыдущим числом
    return (isOdd ? n : 0) + sumOddNumbers(n - 1);
}



/*
 2. Задача про ітерацію

Напишіть функцію яка ітеративно (в циклі) буде знаходити суму всіх непарних додатніх чисел до якогось числа.

Приклад:

function iterativeOddSumTo(number) {

// тут ваш код

};

console.log(iterativeOddSumTo(1)) // 1
console.log(iterativeOddSumTo(10)) // 25

*/