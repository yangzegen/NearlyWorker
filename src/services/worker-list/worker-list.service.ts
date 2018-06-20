import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Worker } from "../../models/worker/worker.model";

@Injectable()
export class WorkerListService{

  private workerListRef = this.db.list<Worker>('workers');

  constructor(private db: AngularFireDatabase){}

  getWorkerList(){
    return this.workerListRef;
  }

  addWorker(worker: Worker){
    return this.workerListRef.push(worker);
  }

}
