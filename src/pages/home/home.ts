import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ToDoCreatePage } from '../todo-details/todo-details';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    toDoList: FirebaseListObservable<any>;
    constructor(public navCtrl: NavController, public af: AngularFire, public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController) {
        this.toDoList = af.database.list('/toDos');
    }
    
    newToDo() {
        this.navCtrl.push(ToDoCreatePage);
    }
    promptComplete(toDoId: string) { 
        let alert = this.alertCtrl.create({ 
            message: "Mark as Completed?", buttons: [{ text: 'Cancel', }, 
        { text: 'Mark as Completed', handler: data => { 
            this.toDoList.update(toDoId, { done: true }); } }] }
        ); 
        
        alert.present(); 
    }
showEditOptions(toDoId, name, notes) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What do you want to edit?',
    buttons: [
      {
        text: 'Edit Name',
        handler: () => {
          this.updateName(toDoId, name);
        }
      },{
        text: 'Edit Notes',
        handler: () => {
          this.updateNotes(toDoId, notes);
        }
      },{
        text: 'Cancel',
      }
    ]
  });
  actionSheet.present();
}
updateNotes(toDoId, notes){
  let prompt = this.alertCtrl.create({
    title: 'Notes',
    message: "Update the notes for this task",
    inputs: [
      {
        name: 'notes',
        placeholder: 'Notes',
        value: notes
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.toDoList.update(toDoId, {
            notes: data.notes
          });
        }
      }
    ]
  });
  prompt.present();
}
updateName(toDoId, name){
  let prompt = this.alertCtrl.create({
    title: 'Name',
    message: "Update the name for this to-do",
    inputs: [
      {
        name: 'name',
        placeholder: 'Name',
        value: name
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.toDoList.update(toDoId, {
            name: data.name
          });
        }
      }
    ]
  });
  prompt.present();
}

    promptDelete(toDoId: string) { 
        let alert = this.alertCtrl.create({ 
            message: "Delete To-Do?", buttons: [{ text: 'Cancel', }, 
        { text: 'Yes', handler: data => { 
            this.toDoList.remove(toDoId); } }] }
        ); 
        
        alert.present(); 
    }
}
