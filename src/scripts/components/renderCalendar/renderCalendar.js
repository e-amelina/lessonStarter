
const renderCalendar = ({ appElement, currentDate, rendered }) => {
  if(rendered) {
    appElement.childNodes[appElement.childNodes.length -1].innerText = '';
  } 

  const calendarContainer = document.createElement("table");
  const calendarHead = document.createElement("thead");
  calendarHead.append(createHeader(currentDate));
  const calendarBody = document.createElement("tbody");
  calendarContainer.prepend(calendarHead); // This element must contain tr > th*monthLength > <span>DayName</span> + <span>DayNum</span>
  calendarContainer.append(calendarBody); // This element must contain tr > td*monthLength
  appElement.append(calendarContainer);
    // let currentDate = new Date();
};

export default renderCalendar;

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

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}