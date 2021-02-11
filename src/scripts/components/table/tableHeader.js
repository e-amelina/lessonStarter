import TableComponent from "./tableComponent";
import { Utils } from "../utils";

export default class TableHeader extends TableComponent {
  constructor(parentSelector, month, year, countDays) {
    super(parentSelector, "thead");

    this.month = month;
    this.year = year;
    this.countDays = countDays;

    this.cells = [];
  }

  update(month, year) {
    this.cells.forEach((cell) => {
      cell.textContent = "";
    });

    this.month = month;
    this.year = year;
    this.fillDaysCells(this.cells);

    // const weekends = this.getCells(".weekend");
    // weekends.forEach((weekend) => {
    //   weekend.classList.remove("weekend");
    // });

    super.removeHidden();
    super.addHidden(this.cells);
  }

  fillDaysCells(daysCells) {
    const button = document.createElement("BUTTON");
    button.innerHTML = "&#10011; Add Vacation";

    for (let cellNumber = 0; cellNumber < daysCells.length; cellNumber++) {
      const currentDay = daysCells[cellNumber];
      if (!cellNumber) {
        currentDay.append(button);
        currentDay.classList.add("cell-button");
      } else if (cellNumber === daysCells.length - 1) {
        currentDay.textContent = "Sum";
        currentDay.classList.add("cell-sum");
      } else if (Utils.hiddenDays(cellNumber, this.countDays, this.countCells)) {
        currentDay.classList.add('hidden');
      // } else if (!Utils.hiddenDays(cellNumber+1, this.countDays, this.countCells)){
      //   currentDay.classList.remove('hidden');
      } else {
        const date = new Date(this.year, this.month - 1, cellNumber);
        const contentCellDay = document.createElement("span");
        contentCellDay.classList.add("day");
        const weekdayName = date.toLocaleDateString("en-US", { weekday: "short" });
        contentCellDay.textContent = weekdayName;
        if (Utils.isWeekend(weekdayName)) {
          currentDay.classList.add("weekend");
        } else {
          currentDay.classList.remove("weekend");
        }
        currentDay.append(contentCellDay);

        const contentCellNumberDay = document.createElement("span");
        contentCellNumberDay.classList.add("date");
        contentCellNumberDay.textContent = `${date.toLocaleDateString("en-US", { day: "numeric" })}`;
        currentDay.append(contentCellNumberDay);
      }
    }

    return daysCells;
  }

  createHeader() {
    const row = super.addRow("days");
    const cellsArray = super.addCells("th", "cell-day");
    this.cells = super.saveCells(cellsArray);
    this.fillDaysCells(cellsArray).forEach((cell) => {
      row.append(cell);
    });
  }

  render() {
    this.createHeader();
    super.render();
  }
}
