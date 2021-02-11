
export function isWeekend (date) {
  if(date.getDay() === 0 || date.getDay() === 6) {

    return true;
  }

  return false;
}

export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}
