import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/take';
import {FirebaseUtilsService} from './firebase-utils.service';

@Injectable()
export class BoardService {

  DEFAULT_BOARD_NAME = 'New Board';
  DEFAULT_BUDGET_MIN = '100';
  DEFAULT_BUDGET_MAX = '1000';

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private authService: AuthService,
    private fbUtilsService: FirebaseUtilsService
  ) { }

  createBoard(): Promise<string> {
    return Promise.resolve(this.authService.getUser())
      .then(user => {
        // Create the board
        return {key: this.firebaseDatabase.list(`boards`).push({created: Date.now()}).key, user: user};
      })
      .then(response => {
        // Create the collaborators list on new board
        this.addCollaboratorToBoard(response.key, response.user.email, true);
        return response;
      })
      .then(response => {
        // Set name to new board
        this.firebaseDatabase.object(`boards/${response.key}`).update({name: this.DEFAULT_BOARD_NAME});
        return response;
      }).then(response => {
        // Update index of boards for user
        this.firebaseDatabase.object(`users/${response.user.uid}/boards/${response.key}`).set(true);
        return response.key;
      });
  }

  getBoardsForCurrentUser(): Promise<any> {
    return Promise.resolve(this.authService.getUser()
      .then(user => {
        return this.firebaseDatabase.database.ref(`users/${user.uid}/boards`).once('value').then(snapshot => snapshot.val());
      }));
}

  updateName(boardId: string, newName: string): Promise<void> {
    return Promise.resolve(this.firebaseDatabase.object(`boards/${boardId}`).update({name: newName}));
  }

  getNameObservable(boardId: string): Promise<Observable<any>> {
    return Promise.resolve(this.firebaseDatabase.object(`boards/${boardId}/name`).valueChanges());
  }

  getName(boardId: string): Promise<string> {
    return Promise.resolve(this.firebaseDatabase.database.ref(`boards/${boardId}/name`).once('value').then(snapshot => snapshot.val()));
  }

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

  updateBudgetForCurrentUser(boardId: string, budget: any): Promise<any> {
    return Promise.resolve(
      this.authService.getUser()
        .then(user => {
          return this.firebaseDatabase
            .object(`boards/${boardId}/collaborators/${this.fbUtilsService.sanitizeKey(user.email)}/budget`)
            .update(budget);
        })
    );
  }

  getBudgetObservable(boardId: string, collaborator: string): Promise<any> {
    return Promise.resolve(
      this.firebaseDatabase
        .object(`boards/${boardId}/collaborators/${this.fbUtilsService.sanitizeKey(collaborator)}/budget`).valueChanges()
    );
  }

  getBoardObservable(boardId: string): Promise<Observable<any>> {
    return Promise.resolve(this.firebaseDatabase.object(`boards/${boardId}`).valueChanges());
  }

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
