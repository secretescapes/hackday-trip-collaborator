import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';

@Injectable()
export class DestinationService {

  private DEFAULT_DESTINATIONS = {
    destinations: {
      london: {
        name: 'london',
        label: 'London',
        active: false
      },
      uk: {
        name: 'uk',
        label: 'United Kingdom',
        active: false
      },
      europe: {
        name: 'europe',
        label: 'Europe',
        active: false
      },
      world: {
        name: 'world',
        label: 'Rest of the World',
        active: false
      }
    }
  };

  constructor(private firebaseDatabase: AngularFireDatabase) {
  }

  getDestinations(boardId: string): Promise<Observable<any>> {
    return Promise.resolve(
      this.firebaseDatabase.list(`boards/${boardId}/destinations`).valueChanges()
    );
  }

  changeDestinationValue(boardId: string, destinationName: string, destinationNewValue: boolean): Promise<void> {
    return Promise.resolve(
      this.firebaseDatabase.object(`boards/${boardId}/destinations/${destinationName}/active`).set(destinationNewValue)
    );
  }

  initialiseDestinationsForBoard(boardId: string): Promise<void> {
    return this.firebaseDatabase.object(`boards/${boardId}`).update(this.DEFAULT_DESTINATIONS);
  }

}
