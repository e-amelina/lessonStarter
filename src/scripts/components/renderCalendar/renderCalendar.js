import {getUsersFromServer} from '../API';
import {getDaysInMonth, isWeekend} from '../utils';


export const renderCalendar = ({ appElement, currentDate, rendered }) => {

  const month = Number.parseInt(currentDate.toLocaleDateString('en-US', {
    month: 'numeric',
  }));
  const year = Number.parseInt(currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
  }));
  
  const countDays = getDaysInMonth(month, year);

  if(rendered) {
    appElement.removeChild(appElement.lastChild);
  } 

  const calendarContainer = document.createElement("table");
  const calendarHead = document.createElement("thead");
  const calendarBody = document.createElement("tbody");
  getUsersFromServer().then(data => {
    calendarHead.append(createTableHeader(calendarHead, month, year, countDays));
    fillDaysCells(year, month);
    calendarContainer.append(createTableBody(calendarBody, data, countDays, month, year));
    fillTeemCells(data, month);
  });
  
  calendarContainer.prepend(calendarHead); // This element must contain tr > th*monthLength > <span>DayName</span> + <span>DayNum</span>

  appElement.append(calendarContainer);
};

const rowsForHeaderSection = 1;
const countCellForTeemsName = 1;
const countCellsForSumPD = 1;

function addRow (root) {
  return root.insertRow();
}

function addCells(row, countDays, month, year, tag, className) {
  
  for (let dayNumber = 1; dayNumber <= countDays + countCellForTeemsName + countCellsForSumPD; dayNumber++) {
    const cell = document.createElement(`${tag}`);
    if(className) {
      cell.classList.add(`${className}`);
    }
    cell.classList.add('cell');


    if(dayNumber === 1) {
      cell.classList.add("teem");
    } else if(dayNumber === countDays + countCellsForSumPD + countCellForTeemsName) {
      cell.classList.add("cell-sum");
    } else {
      const date = new Date(year, month, dayNumber - 1);
      const day = date.toLocaleDateString('en-US', {
        weekday: 'short',
      });
      if(isWeekend(day)) {
        cell.classList.add("weekend");
      }
    }

    row.append(cell);
    
  }
}

function createTableHeader(root, month, year, countDays) {
  const row = addRow(root);
  row.classList.add('days');

  addCells(row, countDays, month, year,'th','day');

  return row;
}
  
function fillDaysCells(year, month) {
  const daysCells = getCells('.day');
  const button = document.createElement("BUTTON");
  button.innerHTML = "&#10011; Add Vacation";

  for(let cellNumber = 0; cellNumber < daysCells.length; cellNumber++) {
    if(!cellNumber) {
      daysCells[cellNumber].appendChild(button);
      daysCells[cellNumber].classList.add("cell-button");
    } else if(cellNumber === daysCells.length-1) {
      daysCells[cellNumber].innerText = 'Sum';
      daysCells[cellNumber].classList.add("cell-sum");
    } else {
      const date = new Date(year, month -1, cellNumber);
      const contentCellDay = document.createElement("span");
      contentCellDay.classList.add("day");
      contentCellDay.innerText = `${date.toLocaleDateString('en-US', { weekday: 'short' })}`;
      daysCells[cellNumber].append(contentCellDay);

      
      const contentCellNumberDay = document.createElement("span");
      contentCellNumberDay.classList.add("date");
      contentCellNumberDay.innerText = `${date.toLocaleDateString('en-US', { day: 'numeric'})}`;
      daysCells[cellNumber].append(contentCellNumberDay);
    }
  }


}

function getCells(className) {
  return document.querySelectorAll(`${className}`);
}

function fillTeemCells(teemsData, month) {
  const teemCells = getCells('.teem');
  let cellNumber = 1;
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


function createTableBody(root, teemsData, countDays, month, year) {
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
      addCells(row, countDays, month, year, 'td' );
    }  
  }

  return root;
}

