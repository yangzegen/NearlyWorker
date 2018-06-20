import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Worker } from "../../models/worker/worker.model";
import { WorkerListService } from '../../services/worker-list/worker-list.service';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  WorkerList$: Observable<Worker[]>;
  filteredworkers: Observable<Worker[]>;
  filters = {}

  skill: string;
  postcode: number;

  constructor(public navCtrl: NavController, public afd:AngularFireDatabase,private worker1: WorkerListService) {

    this.WorkerList$ = this.worker1
      .getWorkerList() //DB list
      .snapshotChanges() //key and value
      .map(
        changes =>{
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
          this.applyFilters()
        });

}
private applyFilters() {
    this.filteredworkers = _.filter(this.WorkerList$, _.conforms(this.filters) )
  }

  filterGreaterThan(property: string, rule: number) {
      this.filters[property] = val => val > rule
      this.applyFilters()
    }
    filterGreaterThan1(property: string, rule: string) {
        this.filters[property] = val => val > rule
        this.applyFilters()
      }
      removeFilter(property: string) {
          delete this.filters[property]
          this[property] = null
          this.applyFilters()
        }
      }
