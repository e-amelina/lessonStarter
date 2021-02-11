import { Utils } from "../utils";
import { Component } from "../component";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

export class Table extends Component {
  constructor(parentSelector, currentDate) {
    super(parentSelector, "table");
    this._currentDate = currentDate;
    this.month = Number.parseInt(this._currentDate.toLocaleDateString("en-US", { month: "numeric" }), 10);
    this.year = Number.parseInt(this._currentDate.toLocaleDateString("en-US", { year: "numeric" }), 10);
    this.countDays = Utils.getDaysInMonth(this.month, this.year);

    this.tableHeader = new TableHeader(this.component, this.month, this.year, this.countDays);
    this.tableBody = new TableBody(this.component, this.countDays, this.month, this.year);
  }

  set currentDate(value) {
    this._currentDate = value;
  }

  get currentDate() {
    return this._currentDate;
  }

  updateTableHead(date) {
    this.currentDate = date;

    this.month = Number.parseInt(this._currentDate.toLocaleDateString("en-US", { month: "numeric" }), 10);
    this.year = Number.parseInt(this._currentDate.toLocaleDateString("en-US", { year: "numeric" }), 10);
    // const cells = this.getCells(".cell-day");

    const cell = this.getCells('.cell');


    // cells.forEach((cell) => {
    //   cell.textContent = "";
    // });

    // this.fillDaysCells(cells);
    const weekends = this.getCells('.weekend');
    weekends.forEach(weekend => {
      weekend.classList.remove('weekend');
    });
    this.removeHidden();
    this.addHidden(cell);

  }

  removeHidden() {
    const hides = this.getCells('.hidden');
    hides.forEach(hide => {
      hide.classList.remove('hidden');
    });
  }

  addHidden(suitableCells) {
    const cells = [];
    for (let day = 1; day < this.countCells; day++) {
      const cell = suitableCells;
      console.log(day);
      if (Utils.hiddenDays(day, this.countDays, this.countCells)) {
        cell.classList.add('hidden');
      } 
      cells.push(cell);
    }
    return cells;
  }

  set tableData(value) {
    this._tableData = value;
  }

  get tableData() {
    return this._tableData;
  }

  render() {
    this.tableBody.tableBodyData = this._tableData;
    this.tableHeader.render();
    this.tableBody.render();
    super.render();
  }
}
