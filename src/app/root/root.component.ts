import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  user: firebase.User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

}
