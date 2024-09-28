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
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const weekButton = document.getElementById('week');
    const monthButton = document.getElementById('month');
    const startDate = startDateInput.value;

    if (startDate) {
        endDateInput.disabled = false;
        endDateInput.min = startDate;
        weekButton.disabled = false;
        monthButton.disabled = false;
        localStorage.setItem('startDate', startDate);
    } else {
        endDateInput.disabled = true;
        endDateInput.value = '';
        weekButton.disabled = true;
        monthButton.disabled = true;
    }
}

function setPeriod(period) {
    const startDate = new Date(localStorage.getItem('startDate'));
    let start, end;

    if (period === 'week') {
        start = new Date(startDate.setDate(startDate.getDate() - startDate.getDay() + 1));
        end = new Date(start);
        end.setDate(start.getDate() + 6);
    } else if (period === 'month') {
        start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        end = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    }

    document.getElementById('startDate').value = start.toISOString().split('T')[0];
    document.getElementById('endDate').value = end.toISOString().split('T')[0];
}

document.getElementById('startDate').addEventListener('change', function() {
    localStorage.setItem('startDate', this.value);
    validateDates();
});