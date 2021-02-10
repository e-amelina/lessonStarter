import { Utils } from '../utils';
import { Component } from '../component';


export class Table extends Component {
  constructor(parentSelector, currentDate, rendered) {
    super(parentSelector, 'table');
    this.currentDate = currentDate;
    this.rendered = rendered;
    this.month = Number.parseInt(currentDate.toLocaleDateString('en-US', { month: 'numeric'}));
    this.year = Number.parseInt(currentDate.toLocaleDateString('en-US', { year: 'numeric'}));
    this.countDays = Utils.getDaysInMonth(this.month, this.year);

    // this.tableHeader = new TableHeader(this.component, this.month, this.year, this.countDays);
    // this.tableBody = new TableBody(this.component, this.countDays, this.month, this.year);
  }

  addRow () {
    return this.component.insertRow();
  }

  set tableData(value) {
    this._tableData = value;
  }

  get tableData() {
    return this._tableData;
  }

  addCells(tag, className) {
    const countCellForTeemsName = 1;
    const countCellsForSumPD = 1;
    const cells = [];
  
    for (let dayNumber = 1; dayNumber <= this.countDays + countCellForTeemsName + countCellsForSumPD; dayNumber++) {
      const cell = document.createElement(`${tag}`);
      if(className) {
        cell.classList.add(`${className}`);
      }
      cell.classList.add('cell');

  
  
      if(dayNumber === 1) {
        cell.classList.add("teem");
      } else if(dayNumber === this.countDays + countCellsForSumPD + countCellForTeemsName) {
        cell.classList.add("cell-sum");
      } else {
        const date = new Date(this.year, this.month, dayNumber - 1);
        const day = date.toLocaleDateString('en-US', {
          weekday: 'short',
        });
        if(Utils.isWeekend(day)) {
          cell.classList.add("weekend");
        }
      }
      cells.push(cell);
    }

    return cells;
    // row.append(cell);
  }

  getCells(className) {
    return document.querySelectorAll(`${className}`);
  }

  fillDaysCells(daysCells) {
    // const daysCells = this.getCells('.day');
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
        const date = new Date(this.year, this.month - 1, cellNumber);
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

    return daysCells;
  }

  fillTeemCell(memberNumber, teemNumber, cell, teemsData) {
    if(!memberNumber){
      cell.append(this.fillCellInformationAboutTeem(teemsData, teemNumber));
    } else {
      cell.innerText = `${teemsData.teams[teemNumber].members[memberNumber-1].name}`;
      cell.innerHTML += `<div class="last-row__cell"></div>`;
    }

    return cell;
  }

  fillCellInformationAboutTeem( teemsData, teemNumber) {
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
    percentageOfAbsent.innerText = ` ${teemsData.teams[teemNumber].percentageOfAbsent[this.month]}%`;
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

  render() {
    if(this.rendered) {
      //hide/show cells
    }

    const rowsForHeaderSection = 1;

    for (let teemNumber = 0; teemNumber < this._tableData.teams.length; teemNumber++) {
      if(!teemNumber) {
        const row = this.addRow();
        row.classList.add('days');

       this.fillDaysCells(this.addCells('th','day')).forEach(cell => {
         row.append(cell);
       });
      }

      for (let memberNumber = 0; memberNumber < this._tableData.teams[teemNumber].members.length + rowsForHeaderSection; memberNumber++) {
        const row = this.addRow();
        row.classList.add(`${(this._tableData.teams[teemNumber].name).split(' ').join('-')}`);
  
        if(memberNumber === 0 ) {
          row.classList.add("department");
        }
        if (memberNumber === this._tableData.teams[teemNumber].members.length + rowsForHeaderSection - 1) {
          row.classList.add("last-row");
        }
        const cells = this.addCells('td');
        if (row.classList.contains("department")) {
          cells.forEach(cell => {
            row.append(cell);
            cell.innerHTML = `<div class="department__cell"></div>`;
          });
        } else if (row.classList.contains("last-row")) {
          cells.forEach(cell => {
            row.append(cell);
            cell.innerHTML = `<div class="last-row__cell"></div>`;
          });
        } 
        this.fillTeemCell(memberNumber, teemNumber, cells[0], this._tableData);
        cells.forEach(cell => {
          row.append(cell);
        });
      }      
    }

    super.render();
  }
}

