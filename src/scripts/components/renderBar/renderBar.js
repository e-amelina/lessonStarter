const renderBar = ({ appElement, currentDate, emitter}) => {

  const calendarToolbar = document.createElement("div");
  calendarToolbar.prepend(createButton(currentDate, emitter, false));
  calendarToolbar.append(createDisplay(currentDate.getMonth(), currentDate.getFullYear()));
  calendarToolbar.append(createButton(currentDate, emitter, true));  
  
  calendarToolbar.classList.add("calendarBar"); // Add class example
  // here toolBar content rendering
  appElement.prepend(calendarToolbar);
};

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];


function createButton (currentDate, emitter, increased) {
  const button = document.createElement("div");
  button.classList.add("btn");
  if(increased) {
    button.classList.add("next-btn");
  }
  if(!increased) {
    button.classList.add("prev-btn");
  }
  button.addEventListener("click", () => {
    const displayDate = document.querySelector(".display-date");
    if(increased) {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    if(!increased) {
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    
    if(displayDate) {
      displayDate.innerText = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      emitter.emit('event:date-changed', currentDate);
    }
  });

  return button;
}


function createDisplay(month, year) {
  const display = document.createElement("span");
  display.classList.add("display-date");
  display.innerText = `${monthNames[month]} ${year}`;

  return display;
}


export default renderBar;
