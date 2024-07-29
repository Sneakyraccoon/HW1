// 1. Створіть 2 змінні з типом number:

"use strict";
let VarNum1 = 8;
let VarNum2 = -2.5;
let VarNum3 = 1_000_000;

// Проведіть з ними такі математичні операції:   

// - додавання:


VarNum1 += 3; 
console.log(VarNum1); // 11


function sum(a, b) {
    return a + b;
}
console.log(sum(VarNum1, VarNum2)); // 11 - 2.5 = 8.5

// - віднімання


VarNum3 -= VarNum1;
console.log(VarNum3); //999989



function sub(a, b) {
    return a - b;
}
console.log(sub(VarNum3, VarNum2)); // 999989 + 2.5 = 999991.5

// - множення 


VarNum2 = VarNum2 * 2  
console.log(VarNum2); // -5



function mult(a, b, c) {
    return a * b * c;
}
console.log(mult(VarNum3, VarNum2, VarNum1)); // 999989 * -5 * 11 = -54_999_395

// - ділення

let VarNum4 = VarNum3 / VarNum2;
console.log(VarNum4); // 999989 / -5 = -199_997.8

// - зведення в ступінь однієї з них


//let result = 2 ** 3; // 8
VarNum1 = VarNum1 ** 2;
console.log(VarNum1); // 121


function exp(x, y) {
    return x ** y;
}
console.log(exp(10, -1)); // 0.1

// - знаходження квадратного кореню однієї з них 


let VarNum5 = -1;
console.log(Math.sqrt(VarNum5)); // NaN


VarNum1 = Math.sqrt(VarNum1);
console.log(VarNum1); // 11

/* 
Результат виконання кожної операції вивести через console.log
Під час виконання завдання необхідно використовувати “use strict”
*/

// 2.  Створіть змінну довільного типу:

let VarUndefind;

// Проведіть наступні перетворення з нею:

// - перетворіть її на рядок


VarUndefind = "36 Years";
console.log(VarUndefind); // 36 Years

// - перетворіть її на число
console.log(Number.parseInt(VarUndefind, 10)); // 36 

/*
VarUndefind = 36;
console.log(VarUndefind); // 36 
 */
// - перетворіть її на булеве значення


VarUndefind = new Boolean(false);
console.log(VarUndefind); // false 
/*
Результат виконання кожного перетворення вивести через console.log
Під час виконання завдання необхідно використовувати “use strict”
*/
