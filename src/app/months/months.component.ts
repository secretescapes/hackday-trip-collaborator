import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MonthsService} from '../months.service';

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent implements OnInit {

  months: Observable<any[]>;
  boardId: string;

  constructor(
    private route: ActivatedRoute,
    private monthsService: MonthsService
  ) { }

  ngOnInit() {
    this.setBoardIdFromParams();
  }

  private setBoardIdFromParams() {
    this.route.params.subscribe((params: any) => params.id ? this.onBoardId(params.id) : this.setBoardIdFromParentParams());
  }

  private setBoardIdFromParentParams() {
    this.route.parent.params.subscribe((params: any) => params.id ? this.onBoardId(params.id) : null);
  }

  private onBoardId(boardId: string) {
    this.boardId = boardId;
    this.monthsService.getMonths(boardId).then((monthsObservable) => this.months = monthsObservable);
  }

  updateMonth(name: string, value: boolean) {
    this.monthsService.changeMonthValue(this.boardId, name, !value);
  }

}
