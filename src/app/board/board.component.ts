import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardService} from '../board.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.boardService.getBoardObservable(params.id).then(board => this.board = board);
      } else {
        this.boardService.createBoard().then(key => {
          this.router.navigate([`/app/board/${key}`]);
        });
      }
    });
  }

}
