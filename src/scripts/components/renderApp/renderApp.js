import { renderBar } from "../renderBar";
import { renderCalendar } from "../renderCalendar";

const renderApp = () => {
  const appElement = document.getElementById("appRoot");
  let currentDate = new Date(); 
  let rendered = false;

  renderCalendar({ appElement, currentDate, rendered });
  renderBar({ appElement, currentDate, pickCurrentDate });
  
  function pickCurrentDate () {

    if(appElement.childNodes.length) {
      rendered = true;
    } 

    const displayDate = document.querySelector(".display-date");
    const button = document.querySelector('.active');
    let increased = button.classList.contains('next-btn');

    increased ? currentDate.setMonth(currentDate.getMonth() + 1) : currentDate.setMonth(currentDate.getMonth() - 1);

    button.classList.remove('active');
    
    if(displayDate) {
      displayDate.innerText = `${currentDate.toLocaleDateString('en-US', 
      {
        year: 'numeric',
        month: 'long',
      }
      )}`;
    }

    renderCalendar({ appElement, currentDate, rendered });
  }

};

export default renderApp;
