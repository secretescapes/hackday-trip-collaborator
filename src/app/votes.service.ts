import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseUtilsService} from './firebase-utils.service';
import {Observable} from 'rxjs';

@Injectable()
export class VotesService {

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private firebaseUtils: FirebaseUtilsService
  ) { }

  getVoteObservable(boardId: string, user: string, saleId: string): Promise<Observable<any>> {
    const safeUsername = this.firebaseUtils.sanitizeKey(user);
    return Promise.resolve(
      this.firebaseDatabase.object(`boards/${boardId}/collaborators/${safeUsername}/votedSales/${saleId}`).valueChanges()
    );
  }

  downVote(boardId: string, user: string, sale: any): Promise<any> {
    const safeUsername = this.firebaseUtils.sanitizeKey(user);
    return Promise.resolve(
      this.firebaseDatabase.database.ref(`boards/${boardId}/collaborators/${safeUsername}/votedSales`).once('value')
      .then(snapshot => {
        if (!snapshot.hasChild(`${sale.id}`)) {
          return Promise.reject(new Error('err_user_already_voted'));
        }
      })
      .then(_ => this.firebaseDatabase.database.ref(`boards/${boardId}/collaborators/${safeUsername}/votedSales/${sale.id}`).remove())
      .then(_ => this.firebaseDatabase.database.ref(`boards/${boardId}/votedSales`).once('value'))
      .then(_ => this.firebaseDatabase.database.ref(`boards/${boardId}/votedSales/${sale.id}/votes`).transaction(votes => {
        if (votes) {
          votes = votes - 1;
        }
        return votes;
      }))
      .catch(this.errorHandler)
    );
  }

  addVote(boardId: string, user: string, sale: any): Promise<any> {
    const safeUsername = this.firebaseUtils.sanitizeKey(user);
    return Promise.resolve(
      this.firebaseDatabase.database.ref(`boards/${boardId}/collaborators/${safeUsername}/votedSales`).once('value')
        .then(snapshot => {
          if (snapshot.hasChild(`${sale.id}`)) {
            return Promise.reject(new Error('err_user_already_voted'));
          }
        })
        .then(_ => this.firebaseDatabase.database.ref(`boards/${boardId}/collaborators/${safeUsername}/votedSales/${sale.id}`).set(true))
        .then(_ => this.firebaseDatabase.database.ref(`boards/${boardId}/votedSales`).once('value'))
        .then(snapshot => {
          if (!snapshot.hasChild(`${sale.id}`)) {
            return this.firebaseDatabase.database.ref(`boards/${boardId}/votedSales/${sale.id}`).set(sale);
          }
        })
        .then(_ => this.firebaseDatabase.database.ref(`boards/${boardId}/votedSales/${sale.id}`).once('value'))
        .then(snapshot => {
          if (!snapshot.hasChild(`votes`)) {
            return this.firebaseDatabase.database.ref(`boards/${boardId}/votedSales/${sale.id}/votes`).set(0);
          }
        })
        .then(_ => this.firebaseDatabase.database.ref(`boards/${boardId}/votedSales/${sale.id}/votes`).transaction(votes => {
          if (votes || votes === 0) {
            votes = votes + 1;
          }
          return votes;
        }))
        .catch(this.errorHandler)
    );
  }

  getVotedSalesObservable(boardId: string): Promise<Observable<any>> {
    return Promise.resolve(this.firebaseDatabase.list(`boards/${boardId}/votedSales`).valueChanges());
  }

  private errorHandler(err) {
    if (err.message !== 'err_user_already_voted') {
      console.log(err);
    }
  }
}
