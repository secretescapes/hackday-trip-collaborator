import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CollaboratorsService} from '../collaborators.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent implements OnInit {

  collaborators: Observable<any[]>;
  form: FormGroup;
  private boardId: string;

  constructor(
    private route: ActivatedRoute,
    private collaboratorsService: CollaboratorsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'email': new FormControl('', [Validators.required, Validators.email])
    });

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
    this.collaboratorsService.getCollaboratorsObservable(this.boardId)
      .then(collaborators => this.collaborators = collaborators);
  }

  onAddCollaborator() {
    if (this.form.valid) {
      this.collaboratorsService.addCollaboratorToBoard(this.boardId, this.form.value.email, false);
      this.form.reset();
    }
  }
}
