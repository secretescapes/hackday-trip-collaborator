import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {BudgetService} from '../budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budget: Observable<any>;
  editMode = false;
  newMax: number;

  private boardId: string;

  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService
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
    this.budgetService.getBudgetObservableForCurrentUser(this.boardId).then(budget => this.budget = budget);
  }

  switchEditMode() {
   this.editMode = !this.editMode;
   if (this.editMode) {
    this.budgetService.getBudgetForCurrentUser(this.boardId).then(budget => {
      this.newMax = budget.max;
    });
   }
  }

  updateBudget() {
    this.budgetService.updateBudgetForCurrentUser(this.boardId, {max: this.newMax}).then(() => {
      this.editMode = false;
    });
  }

}
