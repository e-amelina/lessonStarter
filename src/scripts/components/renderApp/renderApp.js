import renderBar from "../renderBar";
import renderCalendar from "../renderCalendar";
import EventEmitter from "events";

const renderApp = () => {
  const appElement = document.getElementById("appRoot");
  const currentDate = new Date(); 
  const emitter = new EventEmitter();
 
  emitter.on('event:date-changed', date => {
    let rendered = false;
    if(appElement.childNodes.length) {
      rendered = true;
    } 
    renderCalendar({ appElement, currentDate: date, rendered });
    renderBar({ appElement, currentDate: date, emitter });
  });
  
  emitter.emit('event:date-changed', currentDate);

};

export default renderApp;
