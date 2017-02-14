import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { ToDoCreatePage } from '../to-do-create/to-do-create'; 
import { AngularFire, FirebaseListObservable } from 'angularfire2';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    toDoList: FirebaseListObservable<any>; 
    constructor(public navCtrl: NavController, public af: AngularFire, public alertCtrl: AlertController) {
         this.toDoList = af.database.list('/todos'); } newToDo() { this.navCtrl.push(ToDoCreatePage); 
    }

}
