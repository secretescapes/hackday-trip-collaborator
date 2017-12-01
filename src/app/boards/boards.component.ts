import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {BoardService} from '../board.service';
import {BoardNameService} from '../board-name.service';

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
    private boardService: BoardService,
    private boardNameService: BoardNameService
  ) { }

  ngOnInit() {
    this.authService.getUser().then(user => {
      this.user = user;
    });

    this.boardService.getBoardsForCurrentUser().then(boards => {
      if (boards) {
        Object.keys(boards).map(key => this.boardNameService.getName(key).then(name => this.boards.push({name: name, boardId: key})));
      }
    });
  }

}
