import { Utils } from "../utils";
import { Component } from "../component";

export default class TableComponent extends Component {
  constructor(parentSelector, tableTag) {
    super(parentSelector, tableTag);
    this.countCells = 33;
  }

  addRow(className) {
    const row = this.component.insertRow();
    if (className) {
      row.classList.add(className);
    }

    return row;
  }

  removeHidden() {
    const hides = this.getCells(".hidden");
    hides.forEach((hide) => {
      hide.classList.remove("hidden");
    });
  }

  addHidden(suitableCells) {
    const cells = [];
    for (let day = 1; day < this.countCells; day++) {
      if (Utils.hiddenDays(suitableCells[day], this.countDays, this.countCells)) {
        suitableCells[day].classList.add("hidden");
      }
      cells.push(suitableCells[day]);
    }
    return cells;
  }

  saveCells(cells) {
    const savedCells = [];
    for (let cellNumber = 0; cellNumber < cells.length - 1; cellNumber++) {
      if (cellNumber !== cells.length - 1) {
        savedCells.push(cells[cellNumber]);
      }
    }
    return savedCells;
  }

  addCells(tag, className) {
    const cells = [];

    for (let dayNumber = 1; dayNumber <= this.countCells; dayNumber++) {
      const cell = document.createElement(`${tag}`);
      if (className) {
        cell.classList.add(`${className}`);
      }
      cell.classList.add("cell");

      if (dayNumber === 1) {
        cell.classList.add("teem");
      } else if (dayNumber === this.countCells) {
        cell.classList.add("cell-sum");
      } else if (Utils.hiddenDays(dayNumber - 1, this.countDays, this.countCells)) {
        cell.classList.add("hidden");
      } else {
        const date = new Date(this.year, this.month, dayNumber - 1);
        const day = date.toLocaleDateString("en-US", {
          weekday: "short",
        });
        if (Utils.isWeekend(day)) {
          cell.classList.add("weekend");
        // } else {
        //   cell.classList.remove("weekend");
        }
      }
      cells.push(cell);
    }

    return cells;
  }

  getCells(className) {
    return document.querySelectorAll(`${className}`);
  }

  render() {
    super.render();
  }
}
