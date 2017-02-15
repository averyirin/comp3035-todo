import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'page-todo-details',
  templateUrl: 'todo-details.html'
})

export class ToDoCreatePage {
  toDoList: FirebaseListObservable<any>;
  id:string;
  name:string;
  notes:string;

  constructor(public navCtrl: NavController, public af: AngularFire, public navParams: NavParams) {
    this.toDoList = af.database.list('/toDos');
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    this.notes = this.navParams.get('notes');
  }
  //update to saveToDo
  saveToDo(id="", name, notes){
    console.log("id:"+id);
    console.log("name:"+name);
    console.log("notes:"+notes);
    if(id==""){
      this.createToDo(name, notes);
    }else{
      this.updateToDo(id, name, notes);
    }
  }
  updateToDo(id, name, notes){
          this.toDoList.update(id, {
            name:name,
            notes: notes
          })
      this.navCtrl.pop();
  }

  createToDo(name, notes) {
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