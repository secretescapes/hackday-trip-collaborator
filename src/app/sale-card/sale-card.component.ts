import {Component, Input, OnInit} from '@angular/core';
import {VotesService} from '../votes.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sale-card',
  templateUrl: './sale-card.component.html',
  styleUrls: ['./sale-card.component.css']
})
export class SaleCardComponent implements OnInit {

  @Input() sale: any;
  @Input() boardId: string;
  @Input() user: string;

  voted: Observable<boolean>;
  disableButton = false;

  constructor(
    private votesService: VotesService
  ) { }


  ngOnInit() {
    this.votesService.getVoteObservable(this.boardId, this.user, this.sale.id).then(voted => this.voted = voted);
  }

  vote() {
    this.disableButton = true;
    this.votesService.addVote(this.boardId, this.user, this.sale).then(_ => this.disableButton = false);
  }

}
