"use strict";

// напишіть селектори для наступних елементів:
// — для елементу з текстом 'Навігація по DOM дереву'
// — для першого елементу <section>
// — для елементу списку з текстом 'Пункт 5'
// — для елементу з класом 'hatredLevelBlock'
// Кожен селектор має бути унікальним (тобто всі мають бути створені за допомогою різних методів) і має бути присвоєний якійсь змінній.
// Приклад:
// let spanWithClass = document.querySelector('.hatredLevelCounter');

// для елементу з текстом 'Навігація по DOM дереву'
let headerTwo = document.getElementById("headerTwo");

// для першого елементу <section>
let firstSection = document.querySelector("section");

// для елементу списку з текстом 'Пункт 5'
// Використаємо XPath-запит
// XPath-запит "//li[text()='Пункт 5']" буде шукати вс Лішки, які мають текст 'Пункт 5'
// Document - це контекст, в якоу необхідно робити пошук (весь документ)
// null - Простір імен (не використовуємо в даному випадку).
//FIRST_ORDERED_NODE_TYPE - означає шо нам підійде перший результат, що відповідає нашим умовам
let listItemFive = document.evaluate(
  "//li[text()='Пункт 5']",
  document,
  null,
  XPathResult.FIRST_ORDERED_NODE_TYPE,
  null
).singleNodeValue;

// для елементу з класом 'hatredLevelBlock'
let hatredLevelBlock = document.getElementsByClassName('hatredLevelBlock')[0];