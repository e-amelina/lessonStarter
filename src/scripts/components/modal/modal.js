import {Component} from "../component"
  export class Modal extends Component {

  state ={
    title: `Vacation Request`,
    titleDays: `8 Days`
  }
  createModalForm(modal){
    modal.innerHTML = (`
<div class="wrapper">
        <div class="headerModal">
            <h2>${this.state.title}</h2>
            <span>${this.state.titleDays}</span>
        </div>
        <p class="sub__title">Dates</p>
        <div class="modal__inputs">
        <div class="input__from">
        <input type="date" placeholder="from">
        </div>
        <div class="input__to">
        <input type="date" placeholder="to">
        </div>
        </div>
        <p class="sub__title">Vac Type</p>
        <select>
          <option>Paid Day Off (PD)</option>
          <option>Пункт 2</option>
        </select>
        <hr>
        <div id="buttons">
        <button class="btn_cancel" id="cancel_modal">Cancel</button>
        <button class="btn_send">Send</button>
        </div>
    </div>
  `);
  }
}
