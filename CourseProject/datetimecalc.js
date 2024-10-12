
//Функуія для підрахунку к-сті днів/годин/хвилин/секунд 

export function calculateDateTimeNumber(startDate, endDate, dayType, unit) {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
console.log('УРА ЦЕ НОВА Ф-ЦЫЯ');

    let totalUnits = 0;
    let unitsQuantity = 0;

    if (unit === "D") { // Дні
        unitsQuantity = 1;
      } else if (unit === "H") { // Години
        unitsQuantity = 24;
      } else if (unit === "M") { // Хвилини
        unitsQuantity = 1440;
      } else if (unit === "S") { // Секунди
        unitsQuantity = 86400;
      }

    // Чи день будній?
    const isWeekday = (date) => {
      const day = date.getDay();
      return day !== 0 && day !== 6;
    };
  
    // Чи день вихідний?
    const isWeekend = (date) => {
      const day = date.getDay();
      return day === 0 || day === 6;
    };
  
    for (
      let currentDate = new Date(start);
      currentDate <= end;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      if (dayType === "CD") { // Кадендарні дні (всі дні)
        // Подсчитываем все дни
        totalUnits += unitsQuantity;
      } else if (dayType === "WK" && isWeekday(currentDate)) { // Будні (Пн-Пт)
        // Подсчитываем только будние дни
        totalUnits += unitsQuantity;
      } else if (dayType === "WD" && isWeekend(currentDate)) { // Вихідні (Сб/Нд)
        // Подсчитываем только выходные
        totalUnits += unitsQuantity;
      }
    }
  
    return totalUnits;
  }
