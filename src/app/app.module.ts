/*
Program: ToDoApp
Author: Irin Avery 200260949
Date Last Modified: 2/16/2017
File: app.component.ts
Description: Imports modules and pages needed for our application
Update: Added Details navigation to our application
*/
//import modules 
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ToDoCreatePage } from '../pages/todo-details/todo-details';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
//import date pretty pipe
import {MomentModule} from 'angular2-moment';

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyCGHU7J-gg4zdp-h8RWPk4x1yeDFnSKETo",
    authDomain: "comp3025-todo.firebaseapp.com",
    databaseURL: "https://comp3025-todo.firebaseio.com",
    storageBucket: "comp3025-todo.appspot.com",
    messagingSenderId: "69003071348"
};
//our modules to make the application run
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ToDoCreatePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ToDoCreatePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
