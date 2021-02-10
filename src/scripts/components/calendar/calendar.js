import  { Api } from '../API';
import { Table } from "../table";
import { Component } from '../component';
import { Navigation } from '../navigation';


export default class Calendar extends Component {
  constructor(parentSelector) {
    super(parentSelector);
    this.currentDate = new Date();

    this.table = new Table(this.component, this.currentDate, this.rendered);
    this.navigation = new Navigation(this.component, this.currentDate, this.table);
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