import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {BoardService} from '../board.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent implements OnInit {

  private collaborators: Observable<any[]>;
  private boardId: string;
  private form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'email': new FormControl('', [Validators.required, Validators.email])
    });

    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.boardId = params.id;
        this.boardService.getCollaborators(this.boardId)
          .then(collaborators => this.collaborators = collaborators);
      }
    });
  }

  onAddCollaborator() {
    if (this.form.valid) {
      this.boardService.addCollaboratorToBoard(this.boardId, this.form.value.email);
      this.form.reset();
    }
  }
}
