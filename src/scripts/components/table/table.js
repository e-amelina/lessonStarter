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

  updateTable(date) {
    this.currentDate = date;

    this.month = Number.parseInt(this._currentDate.toLocaleDateString("en-US", { month: "numeric" }), 10);
    this.year = Number.parseInt(this._currentDate.toLocaleDateString("en-US", { year: "numeric" }), 10);

    this.tableHeader.update(this.month, this.year);
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
