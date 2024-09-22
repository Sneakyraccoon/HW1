
// Реалізуйте наступну систему, схожу до розглянутої на вебінарі:
// 1) чотири класи для створення об'єктів-сутностей (це можуть бути тварини, покемони, раси і т.д. - проявіть фантазію)
// 2) у кожного класу має бути мінімум 3 властивості та мінімум 3 методи(але можна й більше)
// 3) у кожного класу має бути своя унікальна властивість
// 4) у кожного класу має бути приватна властивість
// 4) у двох класів має бути спільний предок та спільний метод характерний тільки для них
// 5) у всіх чотирьох класів має бути один (крім проміжних) клас-предок

// Створимо загальний клас істоти з властивостями - Імя, вік, середовище існування
// Створимо 3 методи - Eat, Sleep, Move
class Creature {
    constructor(name, age, habitat) {
        this.name = name;
        this.age = age;
        this.habitat = habitat;
    }

    eat() {
        console.log(`${this.name} їсть.`);
    }

    sleep() {
        console.log(`${this.name} спить.`);
    }

    move() {
        console.log(`${this.name} рухається.`);
    }
}

// Створимо клас Ельф, який успадковується від класу Істоти і має приватну властивість - Скритність і має унікальну властивість - Вміння стріляти з лука
class Elf extends Creature {
    #stealth; // приватна властивість

    constructor(name, age, habitat, bowSkill) {
        super(name, age, habitat);
        this.bowSkill = bowSkill; // унікальна властивість
        this.#stealth = 50;
    }
// Методи класу Ельф:
    shootArrow() {
        console.log(`${this.name} має рівнь стріляє з лука: ${this.bowSkill}.`);
    }

    hide() {
        console.log(`${this.name} має рівень непомінтності: ${this.#stealth}.`);
    }

    getStealth() {
        return this.#stealth;
    }
}


// Створимо клас Гном, який успадковується від класу Істоти і має приватну властивість - Сила і має унікальну властивість -  вміння майнити 
class Dwarf extends Creature {
    #strength; // приватна властивість

    constructor(name, age, habitat, miningSkill) {
        super(name, age, habitat);
        this.miningSkill = miningSkill; // унікальна властивість
        this.#strength = 80;
    }
// Методи класу Гном:
    mine() {
        console.log(`${this.name} має рівень майнингу: ${this.miningSkill}.`);
    }

    forge() {
        console.log(`${this.name} має силу кування: ${this.#strength}.`);
    }

    getStrength() {
        return this.#strength;
    }
}



// Спільний предок для Ельфа та Гнома
class Humanoid extends Creature {
    constructor(name, age, habitat, language) {
        super(name, age, habitat);
        this.language = language;
    }

    speak() {
        console.log(`${this.name} розмовляє ${this.language}.`);
    }
}


// Приклади використання

// Створення екземплярів класів
const legolas = new Elf('Legolas', 2931, 'Forest', 95);
const gimli = new Dwarf('Gimli', 139, 'Mountains', 85);
const aragorn = new Humanoid('Aragorn', 87, 'Rohan', 'англійською');

// Використання методів класу Elf
legolas.eat(); // Legolas їсть.
legolas.shootArrow(); // Legolas має рівнь стріляє з лука: 95.
legolas.hide(); // Legolas має рівень непомінтності: 50.

// Використання методів класу Dwarf
gimli.sleep(); // Gimli спить.
gimli.mine(); // Gimli має рівень майнингу: 85.
gimli.forge(); // Gimli має силу кування: 80.

// Використання методів класу Humanoid
aragorn.move(); // Aragorn рухається.
aragorn.speak(); // Aragorn розмовляє мовою.


//*** АВТОМОБІЛІ */

// Базовий клас для всіх автомобілів
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    startEngine() {
        console.log(`${this.make} ${this.model} двигун запущено.`);
    }

    stopEngine() {
        console.log(`${this.make} ${this.model} двигун заглушено.`);
    }

    honk() {
        console.log(`${this.make} ${this.model} сигналить.`);
    }
}



// Клас для легкових автомобілів з приватною властивістю і унікальною властивістю
class Car extends Vehicle {
    #privateProperty = 'Приватна властивість';

    constructor(make, model, year, trunkSize) {
        super(make, model, year);
        this.trunkSize = trunkSize; // Унікальна властивість
    }

    openTrunk() {
        console.log(`${this.make} ${this.model} багажник відкрито.`);
    }

    closeTrunk() {
        console.log(`${this.make} ${this.model} багадник закрито.`);
    }

    getPrivateProperty() {
        return this.#privateProperty;
    }
}


// Клас для електромобілів
class ElectricCar extends Car {
    #batteryLevel = 100; // Приватна властивість

    constructor(make, model, year, trunkSize, batteryCapacity) {
        super(make, model, year, trunkSize);
        this.batteryCapacity = batteryCapacity; // Унікальна властивість
    }

    chargeBattery() {
        this.#batteryLevel = 100;
        console.log(`${this.make} ${this.model} баатрарея повністю заряджена.`);
    }

    checkBatteryLevel() {
        console.log(`${this.make} ${this.model} рівень заряду: ${this.#batteryLevel}%.`);
    }
}


// Приклад використання
const myCar = new Car('Toyota', 'Corolla', 2020, '500L');
myCar.startEngine();
myCar.openTrunk();
console.log(myCar.getPrivateProperty());

const myElectricCar = new ElectricCar('Tesla', 'Model S', 2021, '400L', '100kWh');
myElectricCar.startEngine();
myElectricCar.chargeBattery();
myElectricCar.checkBatteryLevel();