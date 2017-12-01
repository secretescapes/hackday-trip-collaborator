import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {FirebaseUtilsService} from './firebase-utils.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {BudgetService} from './budget.service';

@Injectable()
export class CollaboratorsService {

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private fbUtilsService: FirebaseUtilsService,
    private budgetService: BudgetService
  ) { }

  getCollaborators(boardId: string): Promise<Observable<any>> {
    return Promise.resolve(this.firebaseDatabase.list(`boards/${boardId}/collaborators`).valueChanges());
  }

  addCollaboratorToBoard(boardId: string, collaborator: string, isAdmin: boolean): Promise<void> {
    return Promise.resolve(
      this.firebaseDatabase
        .object(`boards/${boardId}/collaborators/${this.fbUtilsService.sanitizeKey(collaborator)}`)
        .set({
          email: collaborator,
          admin: isAdmin
        })
        .then(() => this.budgetService.createBudgetForCurrentUser(boardId)));
  }

  isCollaboratorAllowedToBoard(boardId: string, collaborator: string): Promise<boolean> {
    return Promise.resolve(
      this.firebaseDatabase
        .object(`boards/${boardId}/collaborators/${this.fbUtilsService.sanitizeKey(collaborator)}`) !== null );
  }

}
