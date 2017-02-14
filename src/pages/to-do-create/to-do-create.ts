import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the ToDoCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-to-do-create',
  templateUrl: 'to-do-create.html'
})
export class ToDoCreatePage {
  toDoList: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public af: AngularFire) {
    this.toDoList = af.database.list('/todos');
  }
  createBill(name, notes, dueDate) {
    this.toDoList.push({ name: name, notes: notes, dueDate: dueDate, done: false }).then(newToDo => { this.navCtrl.pop(); }, error => { console.log(error); });
  }


}
