export const renderBar = ({ appElement, currentDate, pickCurrentDate}) => {

  const calendarToolbar = document.createElement("div");
  calendarToolbar.prepend(createButton(pickCurrentDate, false));
  calendarToolbar.append(createDisplay(currentDate.getMonth(), currentDate.getFullYear()));
  calendarToolbar.append(createButton(pickCurrentDate, true));  
  
  calendarToolbar.classList.add("calendarBar"); 
  appElement.prepend(calendarToolbar);
};

export const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];


function createButton (pickCurrentDate, increased) {
  const button = document.createElement("div");
  button.classList.add("btn");

  increased ? button.classList.add("next-btn") : button.classList.add("prev-btn");

  button.addEventListener("click", () => {
    button.classList.add('active');
    pickCurrentDate();
  });

  return button;
}


function createDisplay(month, year) {
  const display = document.createElement("span");
  display.classList.add("display-date");
  display.innerText = `${monthNames[month]} ${year}`;

  return display;
}


