import {Component, Input, OnInit} from '@angular/core';
import {VotesService} from '../votes.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sale-card',
  templateUrl: './sale-card.component.html',
  styleUrls: ['./sale-card.component.css']
})
export class SaleCardComponent implements OnInit {

  @Input() sale: any;
  @Input() boardId: string;
  @Input() user: string;

  votedObservable: Observable<boolean>;
  disableButton = false;
  voted: boolean;

  constructor(
    private votesService: VotesService
  ) { }


  ngOnInit() {
    this.votesService.getVoteObservable(this.boardId, this.user, this.sale.id).then(voted => this.votedObservable = voted)
      .then(_ => this.votedObservable.subscribe(newValue => this.voted = newValue));
  }

  vote() {
    this.disableButton = true;
    if (!this.voted) {
      this.votesService.addVote(this.boardId, this.user, this.sale).then(_ => this.disableButton = false);
    } else {
      this.votesService.downVote(this.boardId, this.user, this.sale).then(_ => this.disableButton = false);
    }
  }

}
