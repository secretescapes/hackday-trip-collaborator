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
  boards = [];

  constructor(
    private authService: AuthService,
    private boardService: BoardService
  ) { }

  ngOnInit() {
    this.authService.getUser().then(user => {
      this.user = user;
    });

    this.boardService.getBoardsForCurrentUser().then(boards => {
      Object.keys(boards).map(key => this.boardService.getName(key).then(name => this.boards.push({name: name, boardId: key})));
    });
  }

}
