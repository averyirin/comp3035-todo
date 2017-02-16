/*
Program: ToDoApp
Author: Irin Avery 200260949
Date Last Modified: 2/16/2017
File: app.component.ts
Description: Navigates to our home page as the root of our application
Update: Scaffolded application with ionic v2
*/
// import components
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
