import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sale-card',
  templateUrl: './sale-card.component.html',
  styleUrls: ['./sale-card.component.css']
})
export class SaleCardComponent implements OnInit {

  @Input() sale: any;

  constructor() { }

  ngOnInit() {
  }

}
