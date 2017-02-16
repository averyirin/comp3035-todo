/*
Program: ToDoApp
Author: Irin Avery 200260949
Date Last Modified: 2/16/2017
File: Home.ts
Description: Prompts CRUD functionality, and navigates to add and edit page.
Update: Added navigation to edit page with passed values.
*/
// import components
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

    /* Gathers the todo list from the firebase DB */
    public actionSheetCtrl: ActionSheetController) {
        this.toDoList = af.database.list('/toDos');
    }
    //navigate to details page when add button is clicked
    newToDo() {
        this.navCtrl.push(ToDoCreatePage);
    }
    //navigate to details page when edit button is clicked, pass information to edit page
    editToDo(toDoId:string, name:string, notes:string) {
        this.navCtrl.push(ToDoCreatePage,
        {id: toDoId,name:name, notes:notes});
    }
    //prompt complete that updates the done property of the task
    promptComplete(toDoId: string) { 
        let alert = this.alertCtrl.create({ 
            message: "Mark as Completed?", buttons: [{ text: 'Cancel', }, 
        { text: 'Mark as Completed', handler: data => { 
            this.toDoList.update(toDoId, { done: true }); } }] }
        ); 
        
        alert.present(); 
    }

    //prompt delete that removes the task from the list
    promptDelete(toDoId: string) { 
        let alert = this.alertCtrl.create({ 
            message: "Delete To-Do?", buttons: [{ text: 'Cancel', }, 
        { text: 'Yes', handler: data => { 
            this.toDoList.remove(toDoId); } }] }
        ); 
        
        alert.present(); 
    }
}
