// 1. Створіть 2 змінні з типом number:

let VarNum1 = 8;
let VarNum2 = -2.5;
let VarNum3 = 1_000_000;

// Проведіть з ними такі математичні операції:   

// - додавання:

"use strict";
VarNum1 += 3; 
console.log(VarNum1); // 11

"use strict";
function sum(a, b) {
    return a + b;
}
console.log(sum(VarNum1, VarNum2)); // 11 - 2.5 = 8.5

// - віднімання

"use strict";
VarNum3 -= VarNum1;
console.log(VarNum3); //999989


"use strict";
function sub(a, b) {
    return a - b;
}
console.log(sub(VarNum3, VarNum2)); // 999989 + 2.5 = 999991.5

// - множення 

"use strict";
VarNum2 = VarNum2 * 2  
console.log(VarNum2); // -5


"use strict";
function mult(a, b, c) {
    return a * b * c;
}
console.log(mult(VarNum3, VarNum2, VarNum1)); // 999989 * -5 * 11 = -54_999_395

// - ділення
"use strict";
let VarNum4 = VarNum3 / VarNum2;
console.log(VarNum4); // 999989 / -5 = -199_997.8

// - зведення в ступінь однієї з них

"use strict";
//let result = 2 ** 3; // 8
VarNum1 = VarNum1 ** 2;
console.log(VarNum1); // 121

"use strict";
function exp(x, y) {
    return x ** y;
}
console.log(exp(10, -1)); // 0.1

// - знаходження квадратного кореню однієї з них 

"use strict";
let VarNum5 = -1;
console.log(Math.sqrt(VarNum5)); // NaN

"use strict";
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

"use strict";
VarUndefind = "36 Years";
console.log(VarUndefind); // 36 Years
// - перетворіть її на число

/*
// Це чомусь не прцює. Мабуть через тип змінної (Any)
"use strict";
Number.parseInt(VarUndefind, 10); 
console.log(VarUndefind); // 36 
*/

"use strict";
VarUndefind = 36;
console.log(VarUndefind); // 36 
 
// - перетворіть її на булеве значення

"use strict";
VarUndefind = new Boolean(false);
console.log(VarUndefind); // false 
/*
Результат виконання кожного перетворення вивести через console.log
Під час виконання завдання необхідно використовувати “use strict”
*/
