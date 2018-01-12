import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/take';
import {CollaboratorsService} from './collaborators.service';
import {DestinationService} from './destination.service';
import {ActivitiesService} from './activities.service';
import {MonthsService} from './months.service';

@Injectable()
export class BoardService {

  DEFAULT_BOARD_NAME = 'New Board';

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private authService: AuthService,
    private destinationService: DestinationService,
    private activitiesService: ActivitiesService,
    private monthsService: MonthsService,
    private collaboratorsService: CollaboratorsService
  ) { }

  createBoard(): Promise<string> {
    return Promise.resolve(this.authService.getUser())
      .then(user => {
        // Create the board
        return {key: this.firebaseDatabase.list(`boards`).push({created: Date.now()}).key, user: user};
      })
      .then(response => {
        // Create the collaborators list on new board
        this.collaboratorsService.addCollaboratorToBoard(response.key, response.user.email, true);
        return response;
      })
      .then(response => {
        // Set nameObservable to new board
        this.firebaseDatabase.object(`boards/${response.key}`).update({name: this.DEFAULT_BOARD_NAME});
        return response;
      })
      .then(response => {
        // Set destinations
        this.destinationService.initialiseDestinationsForBoard(response.key);
        return response;
      })
      .then(response => {
        // Set activities
        this.activitiesService.initialiseActivitiesForBoard(response.key);
        return response;
      })
      .then(response => {
        // Set Months
        this.monthsService.initialiseMonthsForBoard(response.key);
        return response;
      })
      .then(response => {
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

  getBoardObservable(boardId: string): Promise<Observable<any>> {
    return Promise.resolve(this.firebaseDatabase.object(`boards/${boardId}`).valueChanges());
  }

}
