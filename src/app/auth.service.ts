import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  login(username: string, password: string): Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(username, password);
  }

  signup(username: string, password: string): Promise<any> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(username, password);
  }

  logout(): Promise<void> {
    return this.angularFireAuth.auth.signOut();
  }

  getUser(): Promise<firebase.User> {
    return new Promise((resolve) => {
      this.angularFireAuth.authState.subscribe((auth) => {
        resolve(auth);
      });
    });
  }

}
