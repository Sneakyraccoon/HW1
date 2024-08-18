// 1. Задача про обчислення різниці часу

// Напишіть функцію яка буде буде приймати 3 параметри
// — початкову дату (string)
// — кінцеву дату (string)
// — розмірність ('days',  'hours', 'minutes', seconds)

// Функція повертатиме часовий період між цими датами згідно розмірності.
// Також вкажіть значення по замовчуванню для всіх цих параметрів (на ваш вибір).
// Функція має коректно працювати навіть якщо початкова дата пізніше ніж кінцева дата.

// Приклади:
// durationBetweenDates('02 Aug 1985', '03 Aug 1985', 'seconds')  // поверне '86400 seconds'
// durationBetweenDates('31 Jan 2022', '03 Feb 2021', 'days')  // поверне '362 days'

const msd = 86400000; // к-сть мілісекунд в одному дні
const msh = 3600000; // к-сть мілісекунд в одній годині
const msm = 60000; // к-сть мілісекунд в одній хвилині
const mss = 1000; // к-сть мілісекунд в одній секунді

// Напишемо ф-цію з 3-ма параметрами:
// 1) startDate - За замовчуванням 24 лютого 2022 року
// 2) endDate - За замовчуванням поточна дата
// 3) unit - За замовчуванням одиниця вимірювання - Дні
// У якості return використаємо значення змінної "difference" і задану одиницю вимірювання
function durationBetweenDates(
  begDate = "24 Feb 2022",
  endDate = new Date(),
  unit = "days"
) {
  // Перетворимо дати, які ввів користувач зі стрінга на формат дати
  const beg = new Date(begDate); // Thu Feb 24 2022 00:00:00 GMT+0200 (Eastern European Standard Time)
  const end = new Date(endDate);
  console.log(beg);
  console.log(end);

  // Знайдемо різницю між кінцем і початком у мілісекундах
  let difference = Math.abs(end - beg);
  console.log(difference);

  // Перевіримо яку одиниця вимірювання ввів користувач
  switch (unit) {
    case "days": // Якщо дні
    default: // Вичитав в гуглі таку штуку - якщо вказати в свічі параметр "default",
      // то ця гілка спрацює навіть якщо користувач ввів шось інше окрім 'days',  'hours', 'minutes', 'seconds'
      // отже, додамо це до case "days" щоб ми пішли сюди, навіть якщо одиниця вимірювання буде введена з помилкою (наприклад, "daya")

      //За допомогою метода Math із округленням вниз, поділемо к-сть мілісекунд між датами на к-сть мілісекунд в 1 дні і отримаємо в  "difference" к-сть днів
      difference = Math.floor(difference / msd);
      return `${difference} days`;
    case "hours": // Якщо години
      //За допомогою метода Math із округленням вниз, поділемо к-сть мілісекунд між датами на к-сть мілісекунд в 1 годині і отримаємо в  "difference" к-сть годин
      difference = Math.floor(difference / msh);
      return `${difference} hours`;
    case "minutes": // Якщо хвилини
      //За допомогою метода Math із округленням вниз, поділемо к-сть мілісекунд між датами на к-сть мілісекунд в 1 хвилині і отримаємо в  "difference" к-сть хвилин
      difference = Math.floor(difference / msm);
      return `${difference} minutes`;
    case "seconds": // Якщо секунди
      //За допомогою метода Math із округленням вниз, поділемо к-сть мілісекунд між датами на к-сть мілісекунд в 1 секунді і отримаємо в  "difference" к-сть секунд
      difference = Math.floor(difference / 1000);
      return `${difference} seconds`;
  }
}

console.log(durationBetweenDates()); // Із параментрами за замовчуванням
console.log(durationBetweenDates("02 Aug 1985", "03 Aug 1985", "seconds")); // поверне '86400 seconds'
console.log(durationBetweenDates("31 Jan 2022", "03 Feb 2021", "days")); // поверне '362 days'

// 2. Задача про перетворення об'єкту

// Допустимо у вас є об'єкт, у якому кожен ключ - це назва товару (одним словом), а значення - його ціна.
// Напишіть функцію яка буде всі ключі переводити у нижній регістр, а всі ціни буде заокруглювати до двох знаків після коми.

// Приклад:
// приклад об'єкту:
// const priceData = {
// Apples: '23.4',
// BANANAS: '48',
// oRAngGEs: '48.7584',
// };

// function optimizer(data) {
// 	// тут ваш код
// };

// let updatedPriceData = optimizer(priceData);
// console.log(updatedPriceData) // {apples: '23.40', bananas: '48.00', oranges: '48.76'}

const priceData = {
  Apples: "23.4",
  BANANAS: "48",
  oRAngGEs: "48.7584",
};

function optimizer(priceList) {
  // Створимо новий обєкт "optimizedList", у який ми складемо перетворені ключі і значення із вхідного обєкту
  const optimizedList = {};
  // Пройдемося циклом по всім ключам обєкту
  for (const key in priceList) {
    // Перетворимо ключ у нижній регістр і покладем значення у змінну lowerCaseKey
    const lowerCaseKey = key.toLowerCase();
    // За допомогою метода parseFloat() перетворимо стрінгове значення ключа на числове.
    const numKey = parseFloat(priceList[key]);
    console.log(numKey);
    // За допомогою метода .toFixed() округлимо числове значення ключа (numKey) до 2-х знаків після коми і покладем значення у змінну roundedPrice
    const roundedPrice = numKey.toFixed(2);
    console.log(roundedPrice);
    // Запишимо новий ключ у нижньому регісті (lowerCaseKey) і його значення, округлене до 2-х знаків після коми (roundedPrice) у новий обєкт optimizedList.
    optimizedList[lowerCaseKey] = roundedPrice;
  }
  return optimizedList;
}


let updatedPriceData = optimizer(priceData);
console.log(updatedPriceData) // {apples: '23.40', bananas: '48.00', oranges: '48.76'}