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

  update(month, year, countDays) {
    super.removeHidden();

    this.cells.forEach((cell) => {
      cell.textContent = "";
    });

    const weekends = this.getCells(".weekend");
    weekends.forEach((weekend) => {
      weekend.classList.remove("weekend");
    });

    this.month = month;
    this.year = year;
    this.countDays = countDays;
    this.fillDaysCells(this.cells);
  }

  fillDaysCells(daysCells) {
    for (let cellNumber = 0; cellNumber < this.countCells; cellNumber++) {
      const currentDay = daysCells[cellNumber];
      if (!cellNumber) {
        const button = document.createElement("BUTTON");
        button.innerHTML = "&#10011; Add Vacation";
        currentDay.append(button);
        currentDay.classList.add("cell-button");
      } else if (cellNumber === this.countCells - 1) {
        if (currentDay) {
          currentDay.textContent = "Sum";
          currentDay.classList.add("cell-sum");
        }
      } else if (Utils.hiddenDays(cellNumber, this.countDays, this.countCells)) {
        currentDay.classList.add("hidden");
      } else {
        const date = new Date(this.year, this.month - 1, cellNumber);
        const contentCellDay = document.createElement("span");
        contentCellDay.classList.add("day");
        const weekdayName = date.toLocaleDateString("en-US", { weekday: "short" });
        contentCellDay.textContent = weekdayName;
        if (Utils.isWeekend(weekdayName)) {
          currentDay.classList.add("weekend");
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
