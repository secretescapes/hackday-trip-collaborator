import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class BoardService {

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private authService: AuthService
  ) { }

  createBoard(): Promise<string> {
    return Promise.resolve(this.authService.getUser())
      .then(user => {
        return {key: this.firebaseDatabase.list(`users/${user.uid}/boards`).push({created: Date.now()}).key, user: user};
      })
      .then(response => {
        this.firebaseDatabase.list(`users/${response.user.uid}/boards/${response.key}/collaborators`)
          .push({email: response.user.email, admin: true});
        return response.key;
      })
      ;
  }

  getBoard(boardId: string): Promise<Observable<any>> {
    return this.authService.getUser()
      .then(user => this.firebaseDatabase.object(`users/${user.uid}/boards/${boardId}`).valueChanges());
  }

  getCollaborators(boardId: string): Promise<Observable<any>> {
    return this.authService.getUser()
      .then(user => this.firebaseDatabase.list(`users/${user.uid}/boards/${boardId}/collaborators`).valueChanges());
  }

  addCollaboratorToBoard(boardId: string, collaborator: string): Promise<string> {
    return this.authService.getUser()
      .then(user => {
        return this.firebaseDatabase.list(`users/${user.uid}/boards/${boardId}/collaborators`).push({
          email: collaborator,
          admin: false
        }).key;
      });
  }
}
