import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {BoardNameService} from '../board-name.service';

@Component({
  selector: 'app-board-name',
  templateUrl: './board-name.component.html',
  styleUrls: ['./board-name.component.css']
})
export class BoardNameComponent implements OnInit {

  private boardId: string;
  name: string;
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private boardNameService: BoardNameService
  ) { }

  ngOnInit() {
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
    this.boardNameService.getName(this.boardId).then(name => this.name = name);
  }

  updateName() {
    this.saving = true;
    this.boardNameService.updateName(this.boardId, this.name).then(() => {
      this.saving = false;
    });
  }

}
