// 1. Напишіть код який виводить в консоль значення від 1 до 100, 
// але замість чисел кратних 3 має виводитись `Лол`, 
// замість значень кратних 5 - `Кек`, 
//  замість значень кратних і 3, і 5 - `ЛолКек` 

"use strickt";

//const MaxValue = 100;

// Попросимо користувача ввести число від 0 до 100
let MaxValue = prompt("Please enter a number from 0 to 100", 0);

// Перетворимо значення, яке ввів користувач, щоб точно отримати намбер
MaxValue = Number.parseInt(MaxValue, 10);

// Якщо користувач ввів не намбер (NaN) - видамо повідомлення
if (isNaN(MaxValue)) {
    alert("Введене значення не є числом");
  }

//console.log(MaxValue);

for (let index = 0; index <= MaxValue; index++) {
    if (index % 3) {
        else if (index % 5)
    }
     
    
}
