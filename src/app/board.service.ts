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
      .then(user => this.firebaseDatabase.list(`users/${user.uid}/boards`).push({created: Date.now()}).key);
  }

  getBoard(boardId: string): Promise<Observable<any>> {
    return this.authService.getUser()
      .then(user => this.firebaseDatabase.object(`users/${user.uid}/boards/${boardId}`).valueChanges());
  }
}
