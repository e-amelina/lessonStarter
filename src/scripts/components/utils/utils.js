
export function isWeekend (date) {
  if(date === 'Sun' || date === 'Sat') {

    return true;
  }

  return false;
}

export function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
