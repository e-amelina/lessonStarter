<<<<<<< HEAD

export function isWeekend (date) {
  if(date.getDay() === 0 || date.getDay() === 6) {
=======
export class Utils {
  static isWeekend(date) {
    if (date === "Sun" || date === "Sat") {
      return true;
    }
    return false;
  }
>>>>>>> origin/vacation_reporter_features

    return true;
  }
<<<<<<< HEAD

  return false;
}

export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}
=======
}
>>>>>>> origin/vacation_reporter_features
