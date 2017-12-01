import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/take';

@Injectable()
export class BoardService {

  DEFAULT_BOARD_NAME = 'New Board';

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private authService: AuthService
  ) { }

  createBoard(): Promise<string> {
    return Promise.resolve(this.authService.getUser())
      .then(user => {
        // Create the board
        return {key: this.firebaseDatabase.list(`boards`).push({created: Date.now()}).key, user: user};
      })
      .then(response => {
        // Create the collaborators list on new board
        this.firebaseDatabase.list(`boards/${response.key}/collaborators`)
          .push({email: response.user.email, admin: true});
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
    // return Promise.resolve(this.authService.getUser()
    //   .then(user => this.firebaseDatabase.list(`users/${user.uid}/boards`).valueChanges()));
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

  getBoardObservable(boardId: string): Promise<Observable<any>> {
    return Promise.resolve(this.firebaseDatabase.object(`boards/${boardId}`).valueChanges());
  }

  getCollaborators(boardId: string): Promise<Observable<any>> {
    return Promise.resolve(this.firebaseDatabase.list(`boards/${boardId}/collaborators`).valueChanges());
  }

  addCollaboratorToBoard(boardId: string, collaborator: string): Promise<string> {
    return Promise.resolve(this.firebaseDatabase.list(`boards/${boardId}/collaborators`).push({
          email: collaborator,
          admin: false
        }).key);
  }

  isCollaboratorAllowedToBoard(boardId: string, collaborator: string): Promise<boolean> {
    return Promise.resolve(
    this.firebaseDatabase.database.ref(`boards/${boardId}/collaborators`)
      .orderByChild('email')
      .equalTo(collaborator)
      .once('value')
      .then(snapshot => {
        return snapshot.val() !== null;
      }));
  }
}
