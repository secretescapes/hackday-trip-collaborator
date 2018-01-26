import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';

@Injectable()
export class SalesService {

  constructor(
    private http: HttpClient,
    private firebaseDatabase: AngularFireDatabase
  ) { }

  getAllLiveSales(): Promise<Observable<any>> {
      return this.firebaseDatabase.database.ref(`/allSalesCache/lastUpdated`)
        .once('value')
        .then((snapshot) => {
          const lastUpdated = snapshot.val();
         if (!lastUpdated ||
           ((new Date().getTime() - new Date(lastUpdated).getTime()) > 24 * 60 * 60 * 1000)) {
            return this.refreshSalesCache();
         }
        })
        .then(_ => this.firebaseDatabase.list(`/allSalesCache/sales`).valueChanges());
  }

  refreshSalesCache(): Promise<void> {
    return this.http.get<any[]>('https://dev-14154.fs-staging.escapes.tech/v3/sales?se-api-token=96c5fc07-6dda-4448-bac6-00e817adf4d1')
      .toPromise()
      .then(fullSales => fullSales.map((sale) => ({
          id: sale.id,
          title: sale.title,
          start: sale.start,
          end: sale.end,
          summaryTitle: sale.summaryTitle,
          price: sale.price,
          photos: sale.photos,
          location: sale.location,
          tags: sale.tags
        }
        )).filter((sale) => sale.price != null))
        .then((sales) => this.firebaseDatabase.list(`/allSalesCache`).set('sales', sales))
        .then(_ => this.firebaseDatabase.object(`/allSalesCache/lastUpdated`).set(new Date().toISOString()))
        .catch((error) => console.log(error));
  }
}
