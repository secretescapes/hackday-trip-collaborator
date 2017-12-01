import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {BoardService} from '../board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  user: firebase.User;
  boards: Observable<any>;

  constructor(
    private authService: AuthService,
    private boardService: BoardService
  ) { }

  ngOnInit() {
    this.authService.getUser().then(user => {
      this.user = user;
    });

    this.boardService.getBoardsForCurrentUser().then(boards => this.boards = boards);
  }

}
