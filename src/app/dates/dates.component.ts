import { Component, OnInit } from '@angular/core';
import {DatesService} from '../dates.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent implements OnInit {

  newFrom: string;
  newTo: string;
  errorMsg: string;
  dates: Observable<any[]>;

  private boardId: string;

  constructor(
    private datesService: DatesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.boardId = params.id;
        this.datesService.getDatesObservablesForCurrentUser(this.boardId).then(dates => this.dates = dates);
      }
    });
  }

  addNewDates() {
    this.errorMsg = '';
    if (this.validateInput()) {
      this.datesService.addDatesForCurrentUser(this.boardId, {from: this.newFrom, to: this.newTo})
        .then(() => this.cleanFields());
    } else {
      this.errorMsg = 'Invalid dates';
    }
  }

  validateInput() {
    return this.newFrom && this.newTo && new Date(this.newFrom) < new Date(this.newTo);
  }

  private cleanFields() {
    this.newTo = '';
    this.newFrom = '';
  }


}
