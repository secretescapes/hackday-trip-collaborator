import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';
import {FirebaseUtilsService} from './firebase-utils.service';

@Injectable()
export class DatesService {

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private authService: AuthService,
    private fbUtilsService: FirebaseUtilsService
  ) { }

  addDatesForCurrentUser(boardId: string, dates: any): Promise<any> {
    return this.authService.getUser().then(user => this.addDates(boardId, user.email, dates));
  }

  addDates(boardId: string, collaborator: string, dates: any): Promise<any> {
    return Promise.resolve(
      this.firebaseDatabase.list(`boards/${boardId}/collaborators/${this.fbUtilsService.sanitizeKey(collaborator)}/dates`).push(dates)
    );
  }

}
