import {departmentTeams} from '../API';

console.log(departmentTeams);


const renderCalendar = ({ appElement, currentDate, rendered }) => {

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const countDays = getDaysInMonth(month, year);

  if(rendered) {
    appElement.removeChild(appElement.lastChild);
  } 

  const calendarContainer = document.createElement("table");
  const calendarHead = document.createElement("thead");
  calendarHead.append(createHeader(currentDate));
  calendarContainer.prepend(calendarHead); // This element must contain tr > th*monthLength > <span>DayName</span> + <span>DayNum</span>
  const calendarBody = document.createElement("tbody");
  calendarContainer.append(createBody(calendarBody, countDays));

  appElement.append(calendarContainer);
};

const rowsForHeaderSection = 1;

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'St'];

function createHeader(currentDate) {
  const row = document.createElement("tr");

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const countDays = getDaysInMonth(month, year);

  for(let i = 1; i <= countDays; i++) {
    const date = new Date(year, month, i);
    const cell = document.createElement("th");
    cell.classList.add("cell");

    const contentCellDay = document.createElement("span");
    contentCellDay.classList.add("day");
    contentCellDay.innerText = daysOfWeek[date.getDay()];
    if(date.getDay() === 0 || date.getDay() === 6) {
      cell.classList.add("weekend");
    }
    cell.append(contentCellDay);

    const contentCellNumberDay = document.createElement("span");
    contentCellNumberDay.classList.add("date");
    contentCellNumberDay.innerText = date.getDate();
    cell.append(contentCellNumberDay);

    row.append(cell);
    
  }

  return row;
}

function createBody(root, countDays) {
  for (let i = 0; i < departmentTeams.teams.length; i++) {
    for (let j = 0; j < departmentTeams.teams[i].members.length + rowsForHeaderSection; j++) {
      const row = root.insertRow();
      for (let k = 0; k < countDays; k++) {
        const cell = document.createElement("td");
        cell.classList.add("cell");
        row.append(cell);
        row.style.height = '33px';
      }  
    }  
  }

  return root;
}

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}


export default renderCalendar;
