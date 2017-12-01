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
  editMode = false;
  newMin: number;
  newMax: number;

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

  switchEditMode() {
   this.editMode = !this.editMode;
   if (this.editMode) {
    this.boardService.getBudgetForCurrentUser(this.boardId).then(budget => {
      this.newMin = budget.min;
      this.newMax = budget.max;
    });
   }
  }

  updateBudget() {
    this.boardService.updateBudgetForCurrentUser(this.boardId, {min: this.newMin, max: this.newMax}).then(() => {
      this.editMode = false;
    });
  }

}
