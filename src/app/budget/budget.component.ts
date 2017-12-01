import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BoardService} from '../board.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budget: Observable<any>;
  private boardId: string;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.boardId = params.id;
        this.boardService.getBudgetObservableForCurrentUser(this.boardId).then(budget => this.budget = budget);
      }
    });
  }

}
