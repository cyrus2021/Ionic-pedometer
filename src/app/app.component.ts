import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';


import { AppServiceProvider } from '../providers/app-service/app-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    private platform: Platform, 
    private appservice: AppServiceProvider,
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ) {
    platform.ready()
            .then(() => {
              // Okay, so the platform is ready and our plugins are available.
              // Here you can do any higher level native things you might need.
              statusBar.styleDefault();
              splashScreen.hide();

              this.initPedometer()
            });
  }

  ngOnInit(){
    // console.log("app component init");
  }

  private initPedometer(){

    if(this.platform.is('cordova')){
      this.appservice.pedometerAvailable = true;
    }
    else{
      console.warn("Platform not available");
    }

  }
}

