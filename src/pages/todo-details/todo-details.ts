/*
Program: ToDoApp
Author: Irin Avery 200260949
Date Last Modified: 2/16/2017
File: todo-details.ts
Description: A form that edits or creates new tasks
Update: Now navigates back to the task list after update
*/
//import components
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'page-todo-details',
  templateUrl: 'todo-details.html'
})

export class ToDoCreatePage {
  //our list of tasks from the firebase DB
  toDoList: FirebaseListObservable<any>;
  //informtation for editing
  id:string;
  name:string;
  notes:string;

  //gathers todolist from the database, and the passed values of task information for editing
  constructor(public navCtrl: NavController, public af: AngularFire, public navParams: NavParams) {
    this.toDoList = af.database.list('/toDos');
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    this.notes = this.navParams.get('notes');
  }
  //update to saveToDo
  saveToDo(id="", name, notes){
    if(id==""){
      this.createToDo(name, notes);
    }else{
      this.updateToDo(id, name, notes);
    }
  }
  //Updates the task and then navigates back to the task list view
  updateToDo(id, name, notes){
          this.toDoList.update(id, {
            name:name,
            notes: notes
          })
      this.navCtrl.pop();
  }
  //creates our task by pushing the new task into the firebase DB
  //navigates back to list view upon completion
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