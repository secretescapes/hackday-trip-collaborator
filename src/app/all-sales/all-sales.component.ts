import { Component, OnInit } from '@angular/core';
import {SalesService} from '../sales.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.css']
})
export class AllSalesComponent implements OnInit {

  allSales: Observable<any[]>;

  constructor(
    private salesService: SalesService
  ) { }

  ngOnInit() {
    this.salesService.getAllLiveSales().then(data => {
      this.allSales = data;
    });
  }

}
