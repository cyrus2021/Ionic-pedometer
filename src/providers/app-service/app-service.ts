import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ToastController } from 'ionic-angular';

/*
  Generated class for the AppServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppServiceProvider {

  public pedometerAvailable: boolean = false;
  constructor(private toastctrl: ToastController) {
    console.log('Hello AppServiceProvider Provider');
  }

  public showToast(message: string, duration: number = 3000){
    let toast = this.toastctrl.create({
      message: message,
      duration: duration,
      position: 'bottom'
    });
    
    toast.present();
    return toast;
  }

}
