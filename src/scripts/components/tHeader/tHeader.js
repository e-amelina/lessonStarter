import {getDaysInMonth, isWeekend} from "../utils";
export const createTableHeader =(currentDate)=> {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'St'];
  const row = document.createElement("tr");
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const countDays = getDaysInMonth(month, year);
  const button = document.createElement("BUTTON");
  button.innerHTML = "&#10011; Add Vacation";

  for(let i = 0; i <= countDays + 1; i++) {
    const date = new Date(year, month, i);
    const cell = document.createElement("th");
    cell.classList.add("cell");
    if(i === 0) {
      cell.appendChild(button);
      cell.classList.add("cell-button");
    } else if (i !== (countDays + 1)) {
      const contentCellDay = document.createElement("span");
      contentCellDay.classList.add("day");
      contentCellDay.innerText = daysOfWeek[date.getDay()];
      if(isWeekend(date)) {
        cell.classList.add("weekend");
      }
      cell.append(contentCellDay);

      const contentCellNumberDay = document.createElement("span");
      contentCellNumberDay.classList.add("date");
      contentCellNumberDay.innerText = date.getDate();
      cell.append(contentCellNumberDay);
    } else {
      cell.innerText = 'Sum';
      cell.classList.add("cell-sum");
    }
    row.append(cell);
  }

  return row;
};

