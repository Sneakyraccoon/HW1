"use strict";

// 1. Додати нові задачі +
// 2. Видаляти всі задачі +
// 3. Видаляти окремі задачі +
// 4. Пошук/фільтрація +
// 5. Зберігати в стореджі +

// Отримуємо необхідні DOM елементи
const form = document.querySelector('.create-task-form'); // Форма для створення задач
const taskInput = document.querySelector('.task-input'); // Поле для введення задачі
const collection = document.querySelector('.collection'); // Список задач
const clearButton = document.querySelector('.clear-tasks'); // Кнопка для видалення всіх задач
const filterInput = document.querySelector('.filter-input'); // Поле для фільтрації задач

// Ключ для збереження задач в LocalStorage
const TASKS_STORAGE_KEY = 'tasks';

// Додаємо обробники подій
document.addEventListener('DOMContentLoaded', renderTasks); // При завантаженні сторінки відображаємо задачі з LocalStorage
form.addEventListener('submit', addTask); // Додаємо задачу при сабміті форми
clearButton.addEventListener('click', removeTasks); // Видаляємо всі задачі при натисканні на кнопку
collection.addEventListener('click', removeTask); // Видаляємо окрему задачу при натисканні на кнопку "x"
filterInput.addEventListener('input', filterTasks); // Фільтруємо задачі при введенні тексту у поле

// Відображення задач з LocalStorage
function renderTasks() {
    if (getTasksFromLocalStorage()) {
        const tasks = JSON.parse(getTasksFromLocalStorage());

        // Створюємо елемент для кожної задачі
        tasks.forEach((task, index) => {
            createTask(task, index);
        });
    }
}

// Отримуємо індекс останньої задачі для присвоєння новим задачам
function getLastTasksIndex() {
    if (getTasksFromLocalStorage()) {
        return JSON.parse(getTasksFromLocalStorage()).length;
    }

    return 0;
}

// Створення HTML-елементу для задачі
function createTask(task, index) {
    const li = document.createElement('li');
    li.innerHTML = task;
    li.classList.add('task');
    li.setAttribute('data-id', index); // Присвоюємо задачі унікальний індекс

    // Додаємо кнопку для видалення задачі
    const button = document.createElement('button');
    button.innerHTML = 'x';
    button.className = 'button-icon button-delete';

    li.append(button);

    // Додаємо задачу до колекції (списку)
    collection.append(li);
}

// Додавання нової задачі
function addTask(event) {
    event.preventDefault(); // Відміняємо перезавантаження сторінки при сабміті

    const currentForm = event.target;
    const inputValue = currentForm.task.value; // Отримуємо значення з поля вводу

    if (!inputValue) {
        return; // Якщо поле порожнє, не додаємо задачу
    }

    const currentIndex = getLastTasksIndex(); // Отримуємо індекс для нової задачі

    createTask(inputValue, currentIndex); // Створюємо нову задачу
    setTaskToLocalStorage(inputValue); // Зберігаємо задачу в LocalStorage

    currentForm.reset(); // Очищаємо поле вводу
}

// Зберігаємо задачу в LocalStorage
function setTaskToLocalStorage(task) {
    let tasks = [];

    if (getTasksFromLocalStorage()) {
        tasks = JSON.parse(getTasksFromLocalStorage()); // Отримуємо існуючі задачі
    }

    tasks.push(task); // Додаємо нову задачу
    setTasksToLocalStorage(tasks); // Оновлюємо LocalStorage
}

// Оновлюємо LocalStorage
function setTasksToLocalStorage(tasks) {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks)); // Зберігаємо задачі у форматі JSON
}

// Отримуємо задачі з LocalStorage
function getTasksFromLocalStorage() {
    return localStorage.getItem(TASKS_STORAGE_KEY); // Повертаємо задачі у вигляді рядка
}

// Очищаємо LocalStorage
function clearTasksFromLocalStorage() {
    localStorage.removeItem(TASKS_STORAGE_KEY); // Видаляємо всі задачі з LocalStorage
}

// Видалення всіх задач
function removeTasks() {
    collection.innerHTML = ''; // Очищаємо HTML-код списку задач

    clearTasksFromLocalStorage(); // Очищаємо LocalStorage
}

// Видалення окремої задачі
function removeTask(event) {
    if (event.target.classList.contains('button-delete')) {
        const li = event.target.closest('.task'); // Знаходимо батьківський елемент (задачу)
        const tasks = JSON.parse(getTasksFromLocalStorage()); // Отримуємо задачі з LocalStorage

        // Фільтруємо задачі, залишаючи лише ті, які не мають індексу видаленої задачі
        const filteredTasks = tasks.filter((_, index) => {
            return index.toString() !== li.getAttribute('data-id');
        });

        removeTasks(); // Видаляємо всі задачі з інтерфейсу
        setTasksToLocalStorage(filteredTasks); // Зберігаємо оновлений список задач
        renderTasks(); // Відображаємо задачі після видалення
    }
}

// Фільтрація задач
function filterTasks(event) {
    const filterQuery = event.target.value; // Отримуємо значення з поля фільтрації

    const tasks = collection.querySelectorAll('.task'); // Отримуємо всі задачі

    tasks.forEach((task) => {
        const taskValue = task.firstChild.textContent; // Отримуємо текст задачі
        if (!taskValue.includes(filterQuery.trim())) {
            task.classList.add('hidden'); // Ховаємо задачі, які не відповідають запиту
        } else {
            task.classList.remove('hidden'); // Показуємо задачі, що відповідають запиту
        }
    });
}