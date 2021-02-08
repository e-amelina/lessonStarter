import {getUsersFromServer} from '../API';
import {getDaysInMonth, isWeekend} from '../utils';


export const renderCalendar = ({ appElement, currentDate, rendered }) => {

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
    calendarContainer.append(createTableBody(calendarBody, data, countDays, month, year));
    fillTeemCells(data, month);
  });
  
  calendarContainer.prepend(calendarHead); // This element must contain tr > th*monthLength > <span>DayName</span> + <span>DayNum</span>

  appElement.append(calendarContainer);
};

const rowsForHeaderSection = 1;

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'St'];

function addRow (root) {
  return root.insertRow();
}

function addCells(row, countDays, year, month) {
  const countCellForTeemsName = 1;
  const countCellsForSumPD = 1;
  for (let dayNumber = 1; dayNumber <= countDays + countCellForTeemsName + countCellsForSumPD; dayNumber++) {
    const cell = document.createElement("td");
    cell.classList.add("cell");

    if(dayNumber === 1) {
      cell.classList.add("teem");
    } else if(dayNumber === countDays + countCellsForSumPD + countCellForTeemsName) {
      cell.classList.add("cell-sum");
    } else {
      const date = new Date(year, month, dayNumber-1);

      if(isWeekend(date)) {
        cell.classList.add("weekend");
      }
    }

    row.append(cell);
    
  }
}

function createTableHeader(currentDate) {
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
}

function fillTeemCells(teemsData, month) {
  const teemCells = getTeemCells();
  let cellNumber = 0;
    for (let teemNum = 0; teemNum < teemsData.teams.length; teemNum++) {
      for (let memberNum = 0; memberNum <= teemsData.teams[teemNum].members.length; memberNum++) {
        if(!memberNum){
          teemCells[cellNumber].append(fillCellInformationAboutTeem(teemsData, teemNum, month));
        } else {
          teemCells[cellNumber].innerText = `${teemsData.teams[teemNum].members[memberNum-1].name}`;
        }
        cellNumber++;
      }
    }
}

function fillCellInformationAboutTeem( teemsData, teemNumber, month) {
  const wrap = document.createElement("div");
  wrap.classList.add("teem__info");

  const teemName = document.createElement("span");
  teemName.classList.add("teem__name");
  teemName.innerText = teemsData.teams[teemNumber].name;
  wrap.append(teemName);
  
  const countMembersTeem = document.createElement("span");
  countMembersTeem.classList.add("teem__count-members");
  countMembersTeem.innerText = teemsData.teams[teemNumber].members.length;
  wrap.append(countMembersTeem);

  const percentageOfAbsent = document.createElement("span");
  percentageOfAbsent.classList.add("teem__percentage-absent");
  percentageOfAbsent.innerText = ` ${teemsData.teams[teemNumber].percentageOfAbsent[month]}%`;
  wrap.append(percentageOfAbsent);

  const hideMembers = document.createElement("span");
  hideMembers.classList.add("teem__btn--hide");
  hideMembers.addEventListener("click", (e) => {
    
    if(hideMembers.parentNode.parentElement.parentElement.classList.contains('close')){

      for(let t = 0; t < teemsData.teams.length; t++) {
        if(hideMembers.parentNode.parentElement.parentElement.classList.contains(`${(teemsData.teams[t].name).split(' ').join('-')}`)) {
          const hiddenElem = document.querySelectorAll(`.${(teemsData.teams[t].name).split(' ').join('-')}`);

          hiddenElem.forEach(elem => {
            if(!elem.classList.contains('close')) {
              elem.classList.remove('hidden');
            }
          });
        }
      
      }
      hideMembers.parentNode.parentElement.parentElement.classList.remove('close');

    } else {
      hideMembers.parentNode.parentElement.parentElement.classList.add('close');

      for(let t = 0; t < teemsData.teams.length; t++) {
        if(hideMembers.parentNode.parentElement.parentElement.classList.contains(`${(teemsData.teams[t].name).split(' ').join('-')}`)) {
          const hiddenElem = document.querySelectorAll(`.${(teemsData.teams[t].name).split(' ').join('-')}`);

          hiddenElem.forEach(elem => {
            if(!elem.classList.contains('close')) {
              elem.classList.add('hidden');
            }
          });
        } 
      }
    }

  });

  wrap.append(hideMembers);

  return wrap;
}

function getTeemCells () {
  return document.querySelectorAll('.teem');
}

function createTableBody(root, teemsData, countDays, month, year, calendarContainer) {
  console.log(teemsData.teams[0].name); 
  for (let teemNumber = 0; teemNumber < teemsData.teams.length; teemNumber++) {
    for (let memberNumber = 0; memberNumber < teemsData.teams[teemNumber].members.length + rowsForHeaderSection; memberNumber++) {
      const row = addRow(root);
      row.classList.add(`${(teemsData.teams[teemNumber].name).split(' ').join('-')}`);

      if(memberNumber === 0 ) {
        row.classList.add("department");
      }
      if (memberNumber === teemsData.teams[teemNumber].members.length + rowsForHeaderSection - 1) {
        row.classList.add("last-row");
      }
      addCells(row, countDays, year, month);
    }  
  }

  return root;
}

