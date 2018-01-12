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
      farAway: {
        name: 'farAway',
        label: 'Far Away',
        active: false
      },
      museum: {
        name: 'museum',
        label: 'Museum',
        active: false
      },
      food: {
        name: 'food',
        label: 'Food',
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
