import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the ToDoCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-todo-details',
  templateUrl: 'todo-details.html'
})

export class ToDoCreatePage {
  toDoList: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public af: AngularFire) {
    this.toDoList = af.database.list('/toDos');
  }

  createToDo(name, notes, dueDate) {
    this.toDoList.push({
      name: name,
      notes: notes,
      done: false
    }).then( newToDo => {
      this.navCtrl.pop();
    }, error => {
      console.log(error);
    });
  }

}