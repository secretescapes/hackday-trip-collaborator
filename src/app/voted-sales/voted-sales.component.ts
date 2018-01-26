import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {VotesService} from '../votes.service';
import {AuthService} from 'app/auth.service';

@Component({
  selector: 'app-voted-sales',
  templateUrl: './voted-sales.component.html',
  styleUrls: ['./voted-sales.component.css']
})
export class VotedSalesComponent implements OnInit {

  user: string;
  boardId: string;
  votedSales: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private votesService: VotesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUser().then(user => this.user = user.email);
    this.setBoardIdFromParams();
  }

  private setBoardIdFromParams() {
    this.route.params.subscribe((params: any) => params.id ? this.onBoardId(params.id) : this.setBoardIdFromParentParams());
  }

  private setBoardIdFromParentParams() {
    this.route.parent.params.subscribe((params: any) => params.id ? this.onBoardId(params.id) : null);
  }

  private onBoardId(boardId: string) {
    this.boardId = boardId;
    this.votesService.getVotedSalesObservable(this.boardId).then(observable => this.votedSales = observable);
  }

}
