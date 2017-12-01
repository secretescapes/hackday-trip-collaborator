import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';

@Injectable()
export class BoardNameService {

  constructor(
    private firebaseDatabase: AngularFireDatabase
  ) { }

  updateName(boardId: string, newName: string): Promise<void> {
    return Promise.resolve(this.firebaseDatabase.object(`boards/${boardId}`).update({name: newName}));
  }

  getNameObservable(boardId: string): Promise<Observable<any>> {
    return Promise.resolve(this.firebaseDatabase.object(`boards/${boardId}/name`).valueChanges());
  }

  getName(boardId: string): Promise<string> {
    return Promise.resolve(this.firebaseDatabase.database.ref(`boards/${boardId}/name`).once('value').then(snapshot => snapshot.val()));
  }
}
