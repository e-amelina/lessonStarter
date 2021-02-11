import TableComponent from "./tableComponent";
import { Utils } from "../utils";


export default class TableHeader extends TableComponent {
  constructor(parentSelector, month, year, countDays) {
    super(parentSelector, "thead");

    this.month = month;
    this.year = year;
    this.countDays = countDays;
  }

  fillDaysCells(daysCells) {
    const button = document.createElement("BUTTON");
    button.innerHTML = "&#10011; Add Vacation";
  
    for(let cellNumber = 0; cellNumber < daysCells.length; cellNumber++) {
      const curDay = daysCells[cellNumber];
      if(!cellNumber) {
        curDay.appendChild(button);
        curDay.classList.add("cell-button");
      } else if(cellNumber === daysCells.length-1) {
        curDay.innerText = 'Sum';
        curDay.classList.add("cell-sum");
      } else {
        const date = new Date(this.year, this.month - 1, cellNumber);
        const contentCellDay = document.createElement("span");
        contentCellDay.classList.add("day");
        const weekdayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        contentCellDay.innerText = weekdayName;
        if(Utils.isWeekend(weekdayName)) {
          curDay.classList.add("weekend");
        } 
        curDay.append(contentCellDay);
  
        
        const contentCellNumberDay = document.createElement("span");
        contentCellNumberDay.classList.add("date");
        contentCellNumberDay.innerText = `${date.toLocaleDateString('en-US', { day: 'numeric'})}`;
        curDay.append(contentCellNumberDay);
      }
    }

    return daysCells;
  }

  createHeader() {
    const row = super.addRow("days");
    this.fillDaysCells(super.addCells("th", "cell-day")).forEach((cell) => {
      row.append(cell);
    });
  }

  render() {
    this.createHeader();
    super.render();
  }
}
