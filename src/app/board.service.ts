import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/take';

@Injectable()
export class BoardService {

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private authService: AuthService
  ) { }

  createBoard(): Promise<string> {
    return Promise.resolve(this.authService.getUser())
      .then(user => {
        return {key: this.firebaseDatabase.list(`boards`).push({created: Date.now()}).key, user: user};
      })
      .then(response => {
        this.firebaseDatabase.list(`boards/${response.key}/collaborators`)
          .push({email: response.user.email, admin: true});
        return response.key;
      })
      .then(key => {
        this.firebaseDatabase.object(`boards/${key}`).update({name: 'New Board'});
        return key;
      });
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

  getBoard(boardId: string): Promise<Observable<any>> {
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
