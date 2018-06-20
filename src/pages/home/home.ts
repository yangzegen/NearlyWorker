import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Worker } from "../../models/worker/worker.model";
import { WorkerListService } from '../../services/worker-list/worker-list.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WorkerList$: Observable<Worker[]>;

  constructor(private afAuth: AngularFireAuth,private toast: ToastController,
    public navCtrl: NavController, public afd:AngularFireDatabase, private worker1: WorkerListService) {
      this.WorkerList$ = this.worker1
        .getWorkerList() //DB list
        .snapshotChanges() //key and value
        .map(
          changes =>{
            return changes.map(c => ({
              key: c.payload.key,
              ...c.payload.val(),
            }));
          });
  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
      this.toast.create({
        message: `Welcome to NearlyWorker, ${data.email}`,
        duration:3000
      }).present();
    }else{
      this.toast.create({
      message: `Could not find authtication details`,
      duration:3000
      }).present();
    }
    });
  }

}
