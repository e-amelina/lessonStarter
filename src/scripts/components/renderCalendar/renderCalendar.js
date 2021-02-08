import {getUsersFromServer} from '../API';
import {getDaysInMonth} from '../utils'
import {createTableHeader} from "../tHeader"
import {createTableBody} from "../tBody"

const renderCalendar = ({ appElement, currentDate, rendered }) => {

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const countDays = getDaysInMonth(month, year);

  if(rendered) {
    appElement.removeChild(appElement.lastChild);
  }

  const calendarContainer = document.createElement("table");
  const calendarHead = document.createElement("thead");
  const calendarBody = document.createElement("tbody");
  getUsersFromServer().then(data => {
    calendarHead.append(createTableHeader(currentDate));
    calendarContainer.append(createTableBody(calendarBody, data, countDays, month, year))
  });

  calendarContainer.prepend(calendarHead); // This element must contain tr > th*monthLength > <span>DayName</span> + <span>DayNum</span>
  appElement.append(calendarContainer);
};

export default renderCalendar;
