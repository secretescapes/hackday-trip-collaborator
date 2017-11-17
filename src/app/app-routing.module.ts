import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BoardsComponent} from './boards/boards.component';
import {RootComponent} from './root/root.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
const routes: Routes = [
  { path: '', redirectTo: '/app/boards', pathMatch: 'full' },
  {path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
  ]},
  {path: 'app', component: RootComponent, children: [
    { path: 'boards', component: BoardsComponent }
  ]}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
