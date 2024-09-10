function switchWindow(windowNumber) {
    document.querySelectorAll('.window').forEach((window, index) => {
        window.classList.remove('active');
        document.querySelectorAll('.circle')[index].classList.remove('active');
    });
    setTimeout(() => {
        document.getElementById(`window${windowNumber}`).classList.add('active');
        document.querySelectorAll('.circle')[windowNumber - 1].classList.add('active');
    }, 100); // Задержка для плавного перехода
}

function validateDates() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const endDateInput = document.getElementById('endDate');

    if (startDate) {
        endDateInput.disabled = false;
        endDateInput.min = startDate;
    } else {
        endDateInput.disabled = true;
        endDateInput.value = '';
    }

    if (endDate && endDate < startDate) {
        alert('Дата "По" не может быть меньше даты "С".');
        endDateInput.value = '';
    }
}