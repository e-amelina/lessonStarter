import {departmentTeams} from '../API';


const renderCalendar = ({appElement, currentDate, rendered}) => {

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const countDays = getDaysInMonth(month, year);

  if (rendered) {
    appElement.removeChild(appElement.lastChild);
  }
  const calendarContainer = document.createElement("table");
  const calendarHead = document.createElement("thead");
  calendarHead.append(createTableHeader(currentDate));
  calendarContainer.prepend(calendarHead); // This element must contain tr > th*monthLength > <span>DayName</span> + <span>DayNum</span>
  const calendarBody = document.createElement("tbody");
  calendarContainer.append(createTableBody(calendarBody, departmentTeams, countDays, month, year));

  appElement.append(calendarContainer);
};
const stateShowModal = {
  show: true
};

const rowsForHeaderSection = 1;

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'St'];

function createTableHeader(currentDate) {
  const row = document.createElement("tr");
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const countDays = getDaysInMonth(month, year);
  const button = document.createElement("BUTTON");
  button.addEventListener('click', () => {
    stateShowModal.show = !stateShowModal.show;
    stateShowModal.show ? modal.classList.add("modal-of") : modal.classList.remove("modal-of");
  });
  button.innerHTML = "&#10011; Add Vacation";
  const modal = document.createElement('div');
  modal.innerHTML = (`
  <form action="" >
        <div class="headerModal">
            <h2>Vacation Request</h2>
            <span>8 Days</span>
        </div>
        <span>Dates</span>
        <div class="modal__inputs">
        <input type="date" placeholder="from">
        <input type="date" placeholder="to">
        </div>
        <p>Vac Type</p>
        <select>
          <option>Paid Day Off (PD)</option>
          <option>Пункт 2</option>
        </select>
        <hr>
        <button class="modal__btn-cancel">Cancel</button>
        <button class="modal__btn-send">Send</button>
    </form> 
  `);
  modal.classList.add("modal-of");
  modal.classList.add("modal");
  document.body.append(modal);
  for (let i = 0; i <= countDays; i++) {
    // if(i === 0) {
    //   //create button ????

    // }
    const date = new Date(year, month, i);
    const cell = document.createElement("th");
    cell.classList.add("cell");
    if (i === 0) {
      //create button
      cell.appendChild(button);
      cell.classList.add("cell-button");
    } else {
      const contentCellDay = document.createElement("span");
      contentCellDay.classList.add("day");
      contentCellDay.innerText = daysOfWeek[date.getDay()];
      if (isWeekend(date)) {
        cell.classList.add("weekend");
      }
      cell.append(contentCellDay);

      const contentCellNumberDay = document.createElement("span");
      contentCellNumberDay.classList.add("date");
      contentCellNumberDay.innerText = date.getDate();
      cell.append(contentCellNumberDay);
    }

    row.append(cell);

  }

  return row;
}

function createTableBody(root, teemsData, countDays, month, year) {
  for (let i = 0; i < teemsData.teams.length; i++) {
    for (let j = 0; j < teemsData.teams[i].members.length + rowsForHeaderSection; j++) {
      const row = root.insertRow();

      if (j === 0) {
        row.classList.add("department");
      }

      for (let k = 0; k <= countDays; k++) {
        const cell = document.createElement("td");
        cell.classList.add("cell");

        if (k === 0) {
          cell.classList.add("teem");

          if (j === 0) {
            const wrap = document.createElement("div");
            wrap.classList.add("teem__info");

            const teemName = document.createElement("span");
            teemName.classList.add("teem__name");
            teemName.innerText = teemsData.teams[i].name;
            wrap.append(teemName);

            const countMembersTeem = document.createElement("span");
            countMembersTeem.classList.add("teem__count-members");
            countMembersTeem.innerText = teemsData.teams[i].members.length;
            wrap.append(countMembersTeem);

            const percentageOfAbsent = document.createElement("span");
            percentageOfAbsent.classList.add("teem__percentage-absent");
            percentageOfAbsent.innerText = ` ${teemsData.teams[i].percentageOfAbsent[month]}%`;
            wrap.append(percentageOfAbsent);

            const hideMembers = document.createElement("span");
            hideMembers.classList.add("teem__btn--hide");
            hideMembers.addEventListener("click", () => {
              //hide group
            });

            wrap.append(hideMembers);

            cell.append(wrap);

          } else {
            cell.innerText = teemsData.teams[i].members[j - 1].name;
          }

        } else {
          const date = new Date(year, month, k);

          if (isWeekend(date)) {
            cell.classList.add("weekend");
          }
        }
        row.append(cell);
      }
    }
  }

  return root;
}


function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function isWeekend(date) {
  if (date.getDay() === 0 || date.getDay() === 6) {

    return true;
  }

  return false;
}

export default renderCalendar;
