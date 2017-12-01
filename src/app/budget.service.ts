import { Injectable } from '@angular/core';
import {FirebaseUtilsService} from './firebase-utils.service';
import {AuthService} from './auth.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class BudgetService {

  DEFAULT_BUDGET_MIN = '100';
  DEFAULT_BUDGET_MAX = '1000';

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private authService: AuthService,
    private fbUtilsService: FirebaseUtilsService
  ) { }

  getBudgetObservableForCurrentUser(boardId: string): Promise<any> {
    return this.authService.getUser().then(user => this.getBudgetObservable(boardId, user.email));
  }

  getBudgetForCurrentUser(boardId: string): Promise<any> {
    return this.authService.getUser().then(user => this.getBudget(boardId, user.email));
  }

  getBudget(boardId: string, collaborator: string) {
    return Promise.resolve(
      this.firebaseDatabase.database
        .ref(`boards/${boardId}/collaborators/${this.fbUtilsService.sanitizeKey(collaborator)}/budget`)
        .once('value')
        .then(snapshot => snapshot.val())
    );
  }

  createBudgetForCurrentUser(boardId: string): Promise<any> {
    return this.updateBudgetForCurrentUser(boardId, {min: this.DEFAULT_BUDGET_MIN, max: this.DEFAULT_BUDGET_MAX});
  }

  updateBudget(boardId: string, collaborator: string, budget: any): Promise<any> {
    return Promise.resolve(
      this.firebaseDatabase
      .object(`boards/${boardId}/collaborators/${this.fbUtilsService.sanitizeKey(collaborator)}/budget`)
      .update(budget));
  }

  updateBudgetForCurrentUser(boardId: string, budget: any): Promise<any> {
    return this.authService.getUser().then(user => this.updateBudget(boardId, user.email, budget));
  }

  getBudgetObservable(boardId: string, collaborator: string): Promise<any> {
    return Promise.resolve(
      this.firebaseDatabase
        .object(`boards/${boardId}/collaborators/${this.fbUtilsService.sanitizeKey(collaborator)}/budget`).valueChanges()
    );
  }

}
