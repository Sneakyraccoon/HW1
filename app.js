// 1. Напишіть код який виводить в консоль значення від 1 до 100, 
// але замість чисел кратних 3 має виводитись `Лол`, 
// замість значень кратних 5 - `Кек`, 
//  замість значень кратних і 3, і 5 - `ЛолКек` 

"use strickt";

//const MaxValue = 100;

// Попросимо користувача ввести число від 0 до 100
let MaxValue = prompt("Please enter an integer from 0 to 100", 0);

// Перетворимо значення, яке ввів користувач, щоб точно отримати намбер
MaxValue = Number.parseInt(MaxValue, 10);

// Якщо користувач ввів не намбер (NaN) - видамо повідомлення
if (isNaN(MaxValue)) {
    alert("Введене значення не є числом");
  }

  console.log(MaxValue);

  // Ця ф-ція поверне "true" якщо число (num) є кратним дільнику (divisor)
  function isMultiple(num, divisor) {
    return num % divisor === 0;
  }



for (let index = 0; index <= MaxValue; index++) {
 //   if (index % 3) { if (index % 5){} }
        
 if ( isMultiple(index, 3) === true ) { 
    if (isMultiple(index, 5) === true) { 
        console.log( `ЛолКек`); // Число кратне і 3 і 5
    } else {
        console.log( `Лол`); // Число кратне тільки 3 
    }

    
 } else if (isMultiple(index, 5) === true) {
    console.log( `Кек`); // Число кратне тільки 5
 } else

}
