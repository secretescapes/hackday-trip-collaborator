import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';

@Injectable()
export class ActivitiesService {

  private DEFAULT_ACTIVITIES = {
    activities: {
      beach: {
        name: 'beach',
        label: 'Beach',
        active: false
      },
      city: {
        name: 'city',
        label: 'City',
        active: false
      },
      romance: {
        name: 'romance',
        label: 'Romance',
        active: false
      },
      boutique: {
        name: 'boutique',
        label: 'Shopping',
        active: false
      },
      any: {
        name: 'any',
        label: 'I don\'t mind',
        active: false
      }
    }
  };

  constructor(private firebaseDatabase: AngularFireDatabase) {
  }

  getActivities(boardId: string): Promise<Observable<any>> {
    return Promise.resolve(
      this.firebaseDatabase.list(`boards/${boardId}/activities`).valueChanges()
    );
  }

  changeActivityValue(boardId: string, activityName: string, activityNewValue: boolean): Promise<void> {
    return Promise.resolve(
      this.firebaseDatabase.object(`boards/${boardId}/activities/${activityName}/active`).set(activityNewValue)
    );
  }

  initialiseActivitiesForBoard(boardId: string): Promise<void> {
    return this.firebaseDatabase.object(`boards/${boardId}`).update(this.DEFAULT_ACTIVITIES);
  }

}
