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
    editToDo(toDoId:string, name:string, notes:string) {
        this.navCtrl.push(ToDoCreatePage,
        {id: toDoId,name:name, notes:notes});
    }

    promptComplete(toDoId: string) { 
        let alert = this.alertCtrl.create({ 
            message: "Mark as Completed?", buttons: [{ text: 'Cancel', }, 
        { text: 'Mark as Completed', handler: data => { 
            this.toDoList.update(toDoId, { done: true }); } }] }
        ); 
        
        alert.present(); 
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
