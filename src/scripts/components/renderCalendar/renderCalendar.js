import {getUsersFromServer} from '../API';


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
  getUsersFromServer(calendarBody, countDays, month, year, calendarContainer);
  
  calendarContainer.prepend(calendarHead); // This element must contain tr > th*monthLength > <span>DayName</span> + <span>DayNum</span>

  appElement.append(calendarContainer);
};

const rowsForHeaderSection = 1;

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'St'];

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

export function createTableBody(root, teemsData, countDays, month, year, calendarContainer) {
  console.log(teemsData.teams[0].name); // данные с сервера
  for (let i = 0; i < teemsData.teams.length; i++) {
    for (let j = 0; j < teemsData.teams[i].members.length + rowsForHeaderSection; j++) {
      const row = root.insertRow();
      // row.classList.add(`block${i}`);
      row.classList.add(`${(teemsData.teams[i].name).split(' ').join('-')}`);

      if(j === 0 ) {
        row.classList.add("department");
      }
      if (j === teemsData.teams[i].members.length + rowsForHeaderSection - 1) {
        row.classList.add("last-row");
      }
      // if (j !== 0) {
      //   row.classList.add(`members${i}`);
      // }

      for (let k = 0; k <= countDays + 1; k++) {
        const cell = document.createElement("td");
        cell.classList.add("cell");

        if(k === 0) {
          cell.classList.add("teem");
        
          if(j === 0 ) {
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
          
                // for (let l = 0; l < teemsData.teams.length; l++) {
                //   for (let q = 0; q < teemsData.teams[l].members.length + rowsForHeaderSection; q++) {
                //     row.classList.add('hidden');
                //   }
                // }
              }
            });
            
            wrap.append(hideMembers);

            cell.append(wrap);

          } else {
            cell.innerText = teemsData.teams[i].members[j-1].name;
          }
          
        } else if (k === countDays + 1){
          cell.classList.add("cell-sum");

        } else {
          const date = new Date(year, month, k);

          if(isWeekend(date)) {
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

function isWeekend (date) {
  if(date.getDay() === 0 || date.getDay() === 6) {

    return true;
  }

  return false;
}


export default renderCalendar;
