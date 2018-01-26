import { Component, OnInit } from '@angular/core';
import {SalesService} from '../sales.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {BoardService} from '../board.service';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.css']
})
export class AllSalesComponent implements OnInit {

  boardId: string;
  allSales: Observable<any[]>;
  board: any;
  filters: any;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private salesService: SalesService
  ) { }

  private setBoardIdFromParams() {
    this.route.params.subscribe((params: any) => params.id ? this.onBoardId(params.id) : this.setBoardIdFromParentParams());
  }

  private setBoardIdFromParentParams() {
    this.route.parent.params.subscribe((params: any) => params.id ? this.onBoardId(params.id) : null);
  }

  private onBoardId(boardId: string) {
    this.boardId = boardId;
    this.boardService.getBoard(this.boardId)
      .then(board => this.board = board)
      .then(_ => this.buildFilters())
    ;
  }

  ngOnInit() {
    this.setBoardIdFromParams();
    this.salesService.getAllLiveSales().then(data => {
      this.allSales = data;
    });
  }

  private buildFilters(): any {
    this.filters = {
      activities: Object.keys(this.board.activities)
        .map(k => this.board.activities[k])
        .filter(activity => activity.active)
        .map(activity => activity.name),
      destinations: Object.keys(this.board.destinations)
        .map(k => this.board.destinations[k])
        .filter(destination => destination.active)
        .map(destination => destination.name),
      months: Object.keys(this.board.months)
        .map(k => this.board.months[k])
        .filter(months => months.active)
        .map(months => months.name)
    };
  }

}
