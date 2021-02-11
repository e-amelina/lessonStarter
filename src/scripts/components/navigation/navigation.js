import { Component } from "../component";

export class Navigation extends Component {
  constructor(parentSelector, currentDate, tableComponent) {
    super(parentSelector);
    this.currentDate = currentDate;
    this.tableComponent = tableComponent;
    this.component.innerHTML = `<div class="btn prev-btn"></div>
        <span class="display-date">${this.currentDate.toLocaleDateString('en-US', 
        {
          year: 'numeric',
          month: 'long',
        }
        )}</span>
        <div class="btn next-btn"></div>`;
    this.component.querySelector(".prev-btn").addEventListener("click", this.prevMonth.bind(this));
    this.component.querySelector(".next-btn").addEventListener("click", this.nextMonth.bind(this));
    this.component.classList.add("display-date"); 
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0);
    this.updateMonth(this.currentDate);
    this.tableComponent.updateTable(this.currentDate);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.updateMonth(this.currentDate);
    this.tableComponent.updateTable(this.currentDate);
  }

  updateMonth(newDate) {
    this.component.querySelector(".display-date").textContent = newDate.toLocaleDateString('en-US', 
    {
      year: 'numeric',
      month: 'long',
    }
    );
  }

  render() {
    super.render();
  }
}


