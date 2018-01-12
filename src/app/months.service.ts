import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';

@Injectable()
export class MonthsService {

  private DEFAULT_MONTHS = {
    months: {
      jan: {
        name: 'apr',
        label: 'Apr',
        active: false
      },
      feb: {
        name: 'feb',
        label: 'Feb',
        active: false
      },
      mar: {
        name: 'mar',
        label: 'Mar',
        active: false
      },
      apr: {
        name: 'apr',
        label: 'Apr',
        active: false
      },
      may: {
        name: 'may',
        label: 'May',
        active: false
      },
      jun: {
        name: 'jun',
        label: 'Jun',
        active: false
      },
      jul: {
        name: 'jul',
        label: 'Jul',
        active: false
      },
      aug: {
        name: 'aug',
        label: 'Aug',
        active: false
      },
      sep: {
        name: 'sep',
        label: 'Sep',
        active: false
      },
      oct: {
        name: 'oct',
        label: 'Oct',
        active: false
      },
      nov: {
        name: 'nov',
        label: 'Nov',
        active: false
      },
      dec: {
        name: 'dec',
        label: 'Dec',
        active: false
      }
    }
  };

  constructor(private firebaseDatabase: AngularFireDatabase) {
  }

  getMonths(boardId: string): Promise<Observable<any>> {
    return Promise.resolve(
      this.firebaseDatabase.list(`boards/${boardId}/months`).valueChanges()
    );
  }

  changeMonthValue(boardId: string, monthName: string, monthNewValue: boolean): Promise<void> {
    return Promise.resolve(
      this.firebaseDatabase.object(`boards/${boardId}/months/${monthName}/active`).set(monthNewValue)
    );
  }

  initialiseMonthsForBoard(boardId: string): Promise<void> {
    return this.firebaseDatabase.object(`boards/${boardId}`).update(this.DEFAULT_MONTHS);
  }

}
