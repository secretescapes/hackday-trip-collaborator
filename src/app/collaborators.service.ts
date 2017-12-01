import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {FirebaseUtilsService} from './firebase-utils.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class CollaboratorsService {

  DEFAULT_BUDGET_MIN = '100';
  DEFAULT_BUDGET_MAX = '1000';

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private fbUtilsService: FirebaseUtilsService
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
          admin: isAdmin,
          budget: {
            min: this.DEFAULT_BUDGET_MIN,
            max: this.DEFAULT_BUDGET_MAX
          }
        }));
  }

  isCollaboratorAllowedToBoard(boardId: string, collaborator: string): Promise<boolean> {
    return Promise.resolve(
      this.firebaseDatabase
        .object(`boards/${boardId}/collaborators/${this.fbUtilsService.sanitizeKey(collaborator)}`) !== null );
  }

}
