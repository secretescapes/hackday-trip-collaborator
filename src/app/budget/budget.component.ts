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
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.boardId = params.id;
        this.budgetService.getBudgetObservableForCurrentUser(this.boardId).then(budget => this.budget = budget);
      }
    });
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
