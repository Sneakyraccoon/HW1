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

// 2. Напишіть функцію detonatorTimer(delay) використовуючи вкладений setTimeout

// Вона виводить в консоль число кожну секунду, починаючи з delay (ціле число) і в кінці замість 0 виведе 'BOOM!'

// detonatorTimer(3);
// 3
// 2
// 1
// BOOM!

// detonatorTimer(delay) {
// тут ваш код
// }

function detonatorTimer2(delay) {
  function countdown(currVal) {
    // Якщо поточне значення більше нуля
    if (currVal > 0) {
      console.log(currVal);
      // Викличемо рекурсовно ф-цію countdown через 1000мс з вргументом ЄcurrVal - 1"
      setTimeout(() => countdown(currVal - 1), 1000);
    } else {
      // Якщо поточне значення = 0, виводимо 'BOOM!'
      console.log("BOOM!");
    }
  }
  countdown(delay);
}

detonatorTimer2(11);

// 3. Напишіть об'єкт в якому опишіть свої довільні властивості та довільні методи що ці властивості виводять.

// Наприклад:

// let me = {
// 	name: 'Mykola',
// 	residency: 'Lviv',
// 	gender: 'male',
// 	age: 31,
// 	hobby: 'crafting',
// 	defaultMood: 'focused',
// 	currentMood: 'sleepy',
// 	introduce() {
// 		console.log(`My name is ${this.name} and I live in ${this.residency}`);
// 	},
// 	prognose() {
// 		console.log(`I hope that next year I'm gonna be ${this.age+1}`);
// 	},
// 	describeMyMood(){
// 		console.log(`Mostly I'm ${this.defaultMood}, but now I'm ${this.currentMood}`);
// 	}
// }

// me.introduce();
// me.prognose();
// me.describeMyMood();

// Можете описати скільки хочете властивостей і не менше 2 методів.

// Не соромтесь)

let car = {
  brand: "JEEP",
  model: "Cherokee",
  year: 2014,
  showSpec() {
    console.log(
      `Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`
    );
  },
  availability(quantity) {
    console.log(
      `Availability of ${this.brand} ${this.model} ${this.year} is: ${quantity}`
    );
  },
};

car.showSpec();
car.availability(7);

let restaurant = {
  name: "Пузата хата",
  cuisine: "Українська кухня",
  rating: 4.5,
  info() {
    console.log(
      `Ресторан: ${this.name}, Кухня: ${this.cuisine}, Рейтинг: ${this.rating} зірок`
    );
  },
  serveDish(dish) {
    console.log(`У ресторані ${this.name} готують ${dish}.`);
  },
};

restaurant.info();
restaurant.serveDish("Вареники з картоплею");

let movie = {
  title: "The Dark Knight",
  director: "Christopher Nolan",
  year: 2008,
  getDetails() {
    console.log(
      `Movie: "${this.title}", directed by ${this.director}, released in ${this.year}`
    );
  },
  play() {
    console.log(`Playing movie "${this.title}"...`);
  },
};

movie.getDetails();
movie.play();

// 4. А тепер зробіть всі свої методи з попередньої задачі прив'язаними до контексту свого об'єкту

// Аби вони були захищені від перезапису об'єкту і їх можна було викликати в таймері:

// let securedSelfIntroduce = // якийсь код
// let securedSelfPrognose = // якийсь код
// let securedSelfDescribeMyMood = *// якийсь код

// setTimeout(securedSelfIntroduce, 1000); // виведе коректний результат
// setTimeout(securedSelfPrognose, 2000); // виведе коректний результат
// setTimeout(securedSelfDescribeMyMood, 3000); // виведе коректний результат

// Прив'язка методів до їхніх об'єктів
let securedShowSpec = car.showSpec.bind(car);
let securedAvailability = car.availability.bind(car);

let securedInfo = restaurant.info.bind(restaurant);
let securedServeDish = restaurant.serveDish.bind(restaurant);

let securedGetDetails = movie.getDetails.bind(movie);
let securedPlay = movie.play.bind(movie);

// Використання setTimeout для виклику прив'язаних методів
setTimeout(securedGetDetails, 1000); // виведе коректний результат
setTimeout(securedPlay, 2000); // виведе коректний результат

setTimeout(securedInfo, 1000); // виведе коректний результат
setTimeout(securedServeDish("Борщ"), 2000); // виведе коректний результат

setTimeout(securedShowSpec, 1000); // виведе коректний результат
setTimeout(securedAvailability(11), 2000); // виведе коректний результат

// 5. Напишіть функцію-декоратор яка вповільнює виконання довільної функції на вказану кількість секунд.

// Запишимо ф-цію, яка приймає в якості аргкмента іншу ф-цію і к-сть секунд для уповільнення
// використаємо спред оператор, щоб ф-ція молга прийняти будь-яку к-сіть аргументів яук масив
function slower(func, seconds) {
  return function (...args) {
    console.log(`Chill out, you will get your result in ${seconds} seconds`);
    // задамо таймаут у кс-ть секунд * 1000мс для виклику ф-ції "func"
    setTimeout(() => {
      func(...args);
    }, seconds * 1000);
  };
}

// Довільна функція, яка робить якусь роботу зі своїми аргументами та виводить результат в консоль
function someFunction(a, b) {
  const result = a + b;
  console.log(`The result is: ${result}`);
  return result;
}

// Обгортаємо функцію 'someFunction' в декоратор і задаємо значення вповільнення
const slowedSomeFunction = slower(someFunction, 8);

// Викликаємо декоратор з аргументами
slowedSomeFunction(2000, 24);
