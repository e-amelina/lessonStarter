// export const renderBar = ({ appElement, currentDate, pickCurrentDate}) => {

//   const calendarToolbar = document.createElement("div");
//   calendarToolbar.prepend(createButton(pickCurrentDate, false));
//   calendarToolbar.append(createDisplay(currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', })));
//   calendarToolbar.append(createButton(pickCurrentDate, true));

//   calendarToolbar.classList.add("calendarBar");
//   appElement.prepend(calendarToolbar);
// };


// function createButton (pickCurrentDate, increased) {
//   const button = document.createElement("div");
//   button.classList.add("btn");
//   increased ? button.classList.add("next-btn") : button.classList.add("prev-btn");

//   button.addEventListener("click", () => {
//     button.classList.add('active');
//     pickCurrentDate();
//   });

//   return button;
// }

// function createDisplay(date) {
//   const display = document.createElement("span");
//   display.classList.add("display-date");
//   display.innerText = `${date}`;

//   return display;
// }

import { Component } from "../component";

export class Navigation extends Component {
  constructor(parentSelector, currentDate) {
    super(parentSelector);
    // this.tableComponent = tableComponent;
    this.currentDate = currentDate;
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
    this.tableComponent.updateTableHead(this.currentDate);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.updateMonth(this.currentDate);
    this.tableComponent.updateTableHead(this.currentDate);
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


