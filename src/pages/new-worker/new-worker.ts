import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Worker } from "../../models/worker/worker.model";
import { AngularFireDatabase } from 'angularfire2/database';
import { WorkerListService } from '../../services/worker-list/worker-list.service';

@Component({
  selector: 'page-new-worker',
  templateUrl: 'new-worker.html'
})
export class NewWorkerPage {
  worker: Worker={
    name:'',
    email:'',
    phone:undefined,
    postcode:undefined,
    skill:'',
  };

  constructor(public navCtrl: NavController, public afd:AngularFireDatabase, private worker1: WorkerListService) {

  }

  addWorker(worker: Worker){
    this.worker1.addWorker(worker).then(ref =>{
      this.navCtrl.setRoot(HomePage, {key: ref.key});
    })
  }


}
