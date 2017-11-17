import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  private user: firebase.User;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

}
