<<<<<<< HEAD
=======
<<<<<<< HEAD

export function isWeekend (date) {
  if(date.getDay() === 0 || date.getDay() === 6) {
=======
>>>>>>> e291fce147371cb3210474b911cf5159e916b785
export class Utils {
  static isWeekend(date) {
    if (date === "Sun" || date === "Sat") {
      return true;
    }
    return false;
  }
<<<<<<< HEAD

  static getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
}
=======
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
>>>>>>> e291fce147371cb3210474b911cf5159e916b785
