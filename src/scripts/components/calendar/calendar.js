import  { Api } from '../API';
import { Table } from "../renderCalendar";
import { Component } from '../component';
import { Navigation } from '../renderBar';


export default class Calendar extends Component {
  constructor(parentSelector) {
    super(parentSelector);
    this.currentDate = new Date();
    this.rendered = false;
  
    this.navigation = new Navigation(this.component, this.currentDate);
    this.table = new Table(this.component, this.currentDate, this.rendered);
  }

  render() {
    Api
      .getUsers()
      .then(response => {
        this.table.tableData = response;
        this.navigation.render();
        this.table.render();
        super.render();
      })
      .catch(error => {
        console.log('Error from get users', error);
      });
  }
}


// const renderApp = () => {
//   const appElement = document.getElementById("appRoot");
//   let currentDate = new Date(); 
//   let rendered = false;

//   renderCalendar({ appElement, currentDate, rendered });
//   renderBar({ appElement, currentDate, pickCurrentDate });
  
//   function pickCurrentDate () {

//     if(appElement.childNodes.length) {
//       rendered = true;
//     } 

//     const displayDate = document.querySelector(".display-date");
//     const button = document.querySelector('.active');
//     let increased = button.classList.contains('next-btn');

//     increased ? currentDate.setMonth(currentDate.getMonth() + 1) : currentDate.setMonth(currentDate.getMonth() - 1);

//     button.classList.remove('active');
    
//     if(displayDate) {
//       displayDate.innerText = `${currentDate.toLocaleDateString('en-US', 
//       {
//         year: 'numeric',
//         month: 'long',
//       }
//       )}`;
//     }

//     renderCalendar({ appElement, currentDate, rendered });
//   }

// };

// export default renderApp;
