import TableComponent from "./tableComponent";

export default class TableBody extends TableComponent {
  constructor(parentSelector, countDays, month, year) {
    super(parentSelector, "tbody");
    this.countDays = countDays;
    this.month = month;
    this.year = year;
  }

  set tableBodyData(value) {
    this._tableBodyData = value;
  }

  get tableBodyData() {
    return this._tableBodyData;
  }

  fillTeemCell(memberNumber, cell, teemData) {
    if (!memberNumber) {
      cell.append(this.fillCellInformationAboutTeem(teemData));
    } else {
      cell.textContent = `${teemData.members[memberNumber - 1].name}`;
    }

    return cell;
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

      if (memberNumber === 0) {
        row.classList.add("department");
      }

      if (memberNumber === teamData.members.length + rowsForHeaderSection - 1) {
        row.classList.add("last-row");
      }

      const cells = this.addCells("td");
      this.createBorder(cells);
      this.fillTeemCell(memberNumber, cells[0], teamData);
      cells.forEach((cell) => {
        row.append(cell);
      });
    }
  }

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
    super.render();
  }
}
