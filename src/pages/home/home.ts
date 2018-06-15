import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';

import { Pedometer, IPedometerData } from '@ionic-native/pedometer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private naText: string = "n/a";
  private togglePedo: boolean = false;
  private pedoAvailable: boolean;
  private trackingStarted: boolean = false;
  private streamData: any = {
    start: "NA",
    end: "NA",
    steps: "NA"
  };

  constructor(
    private zone: NgZone,
    public navCtrl: NavController, 
    private appservice: AppServiceProvider,
    private pedometer: Pedometer
    ) {

  }

  ngOnInit(){
    // this.pedoAvailable = this.appservice.pedometerAvailable;
    this.pedoAvailable = true;
  }

  private highligtSteps: boolean = false;
  private highlightTimer: number = 0;

  private pedotoggled(){
    console.log('pedt toggle', this.togglePedo);

    let mess = "";
    if(this.pedoAvailable){
      if(this.togglePedo){
        this.pedometer.startPedometerUpdates()
                      .subscribe((data: IPedometerData) => {
                        this.trackingStarted = true;
                        console.log("Pedo data: ",data);

                        let localestart = typeof data.startDate === 'number' ? new Date(data.startDate).toLocaleString() : typeof data.startDate === 'string' ? new Date(parseInt(data.startDate)).toLocaleString() : this.naText;
                        
                        if(this.streamData.start !== localestart){
                          this.appservice.showToast("Pedo started");
                        }

                        this.streamData.start = localestart;
                        this.streamData.end = typeof data.endDate === 'number' ? new Date(data.endDate).toLocaleString() : typeof data.endDate === 'string' ? new Date(parseInt(data.endDate)).toLocaleString() : this.naText;
                        this.streamData.steps = data.numberOfSteps.toLocaleString();

                        clearTimeout(this.highlightTimer);

                        this.highligtSteps = true;
                        this.highlightTimer = setTimeout(() => {
                          this.highligtSteps = false;
                          this.zone.run(() => {});
                        },1000);

                        this.zone.run(() => {});
                      },(err) =>{
                        console.warn("Error: ", err);
                        this.appservice.showToast("Pedo start error");
                      });
      }
      else{
        this.pedometer.stopPedometerUpdates()
                      .then((data) => {
                        console.log("Pedo stop data: ",data);
                        this.appservice.showToast("Pedo stopped");
                      })
                      .catch((err) => {
                        console.warn("Pedo stop err: ", err);
                        this.appservice.showToast("Pedo stop err");
                      })
      }

    }
    else{
      mess = "no pedo available";
      console.warn(mess);
      this.appservice.showToast(mess);
    }
  }

  

}
