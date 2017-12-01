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
  name: Observable<string>;
  editMode = false;
  newName: string;

  constructor(
    private route: ActivatedRoute,
    private boardNameService: BoardNameService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.boardId = params.id;
        this.boardNameService.getNameObservable(this.boardId).then(name => this.name = name);
      }
    });
  }

  switchEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.boardNameService.getName(this.boardId).then(name => {
        this.newName = name;
      });
    }
  }

  updateName() {
    this.boardNameService.updateName(this.boardId, this.newName).then(() => {
      this.editMode = false;
    });
  }

}
