import TableComponent from "./tableComponent";
import { Utils } from "../utils";

export default class TableBody extends TableComponent {
  constructor(parentSelector, countDays, month, year) {
    super(parentSelector, "tbody");
    this.countDays = countDays;
    this.month = month;
    this.year = year;

    this.cells = [];
  }

  set tableBodyData(value) {
    this._tableBodyData = value;
  }

  get tableBodyData() {
    return this._tableBodyData;
  }

  update(month, year, countDays) {
    this.countDays = countDays;
    this.month = month;
    this.year = year;
    this.countDays = countDays;
    this.deletePaidDays();
    this.addPaidDays();

    for (let cell = 0; cell < this.cells.length; cell++) {
      const rowCell = this.cells[cell];

      for (let cellNumber = rowCell.length - 1; cellNumber > this.countDays; cellNumber--) {
        rowCell[cellNumber].classList.add("hidden");
      }

      for (let cellN = 1; cellN < rowCell.length; cellN++) {
        const date = new Date(this.year, this.month - 1, cellN);
        const weekdayName = date.toLocaleDateString("en-US", { weekday: "short" });
        if (Utils.isWeekend(weekdayName)) {
          rowCell[cellN].classList.add("weekend");
        }
      }
    }
  }

  fillTeemCell(memberNumber, cell, teemData) {
    if (!memberNumber) {
      cell.append(this.fillCellInformationAboutTeem(teemData));
    } else {
      cell.textContent = `${teemData.members[memberNumber - 1].name}`;
    }

    return cell;
  }

  addPaidDays() {
    let rowNumber = 1;
    for (let teamNumber = 0; teamNumber < this._tableBodyData.teams.length; teamNumber++) {
      this.addPaidDaysForTeem(this._tableBodyData.teams[teamNumber], rowNumber);
      rowNumber += this._tableBodyData.teams[teamNumber].members.length + 1;
    }
  }

  addPaidDaysForTeem(teamData, rowNumber) {
    let row = rowNumber;
    for (let memberNumber = 0; memberNumber < teamData.members.length; memberNumber++, row++) {
      const cells = this.cells[row];
      const paidDays = this.getPaidDays(teamData.members[memberNumber].vacations);
      paidDays.forEach((day) => {
        if (day.month === this.month) {
          for (let paidDay = day.startDay; paidDay <= day.endDay; paidDay++) {
            cells[paidDay].classList.add("paid-day");
            if (paidDay === day.startDay) {
              cells[paidDay].classList.add("paid-day-first");
            } else if (paidDay === day.endDay) {
              cells[paidDay].classList.add("paid-day-last");
            }
          }
        }
      });
    }
  }

  deletePaidDays() {
    const paidDays = this.getCells(".paid-day");
    paidDays.forEach((paidDay) => {
      paidDay.classList.remove("paid-day");
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getPaidDays(vacations) {
    const paidDays = [];
    vacations.forEach((vacation) => {
      paidDays.push({
        startDay: Number.parseInt(vacation.startDate.split(".")[0], 10),
        month: Number.parseInt(vacation.startDate.split(".")[1], 10),
        endDay: Number.parseInt(vacation.endDate.split(".")[0], 10),
      });
    });

    return paidDays;
  }

  fillCellInformationAboutTeem(teamData) {
    const wrap = document.createElement("div");
    wrap.classList.add("teem__info");

    const teemName = document.createElement("span");
    teemName.classList.add("teem__name");
    teemName.textContent = teamData.name;
    wrap.append(teemName);

    const countMembersTeem = document.createElement("span");
    countMembersTeem.classList.add("teem__count-members");
    countMembersTeem.textContent = teamData.members.length;
    wrap.append(countMembersTeem);

    const percentageOfAbsent = document.createElement("span");
    percentageOfAbsent.classList.add("teem__percentage-absent");
    percentageOfAbsent.textContent = ` ${teamData.percentageOfAbsent[this.month]}%`;
    wrap.append(percentageOfAbsent);

    const hideMembers = document.createElement("span");
    hideMembers.classList.add("teem__btn--hide");
    hideMembers.addEventListener("click", (event) => {
      const hideButton = event.target;

      const hiddenBlock = hideButton.closest("tr");
      if (hiddenBlock.classList.contains("close")) {
        if (hiddenBlock.classList.contains(`${teamData.name.split(" ").join("-")}`)) {
          const hiddenElements = document.querySelectorAll(`.${teamData.name.split(" ").join("-")}`);
          hiddenElements.forEach((element) => {
            if (!element.classList.contains("close")) {
              element.classList.remove("hidden");
            }
          });
        }
        hiddenBlock.classList.remove("close");
      } else {
        hiddenBlock.classList.add("close");
        if (hiddenBlock.classList.contains(`${teamData.name.split(" ").join("-")}`)) {
          const hiddenElements = document.querySelectorAll(`.${teamData.name.split(" ").join("-")}`);

          hiddenElements.forEach((element) => {
            if (!element.classList.contains("close")) {
              element.classList.add("hidden");
            }
          });
        }
      }
    });

    wrap.append(hideMembers);

    return wrap;
  }

  createTeem(teamData) {
    const rowsForHeaderSection = 1;

    for (let memberNumber = 0; memberNumber < teamData.members.length + rowsForHeaderSection; memberNumber++) {
      const row = super.addRow(`${teamData.name.split(" ").join("-")}`);
      const cells = this.addCells("td");

      this.cells.push(super.saveCells(cells));
      this.fillTeemCell(memberNumber, cells[0], teamData);

      if (memberNumber === 0) {
        row.classList.add("department");
        this.createBorder(cells);
      }

      if (memberNumber === teamData.members.length + rowsForHeaderSection - 1) {
        row.classList.add("last-row");
        this.createBorder(cells);
      }
      cells.forEach((cell) => {
        row.append(cell);
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createBorder(cells) {
    cells.forEach((cell) => {
      const container = document.createElement("div");
      container.classList.add("last-row__cell");
      cell.append(container);
    });
  }

  createBody() {
    for (let teemNumber = 0; teemNumber < this._tableBodyData.teams.length; teemNumber++) {
      this.createTeem(this._tableBodyData.teams[teemNumber]);
    }
  }

  render() {
    this.createBody();
    this.addPaidDays();
    super.render();
  }
}
