import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BoardsComponent} from './boards/boards.component';
import {RootComponent} from './root/root.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuardService} from './auth-guard.service';
import {BoardComponent} from './board/board.component';
import {CollaboratorsComponent} from './collaborators/collaborators.component';
import {BoardGuardService} from './board-guard.service';
import {WizardComponent} from './wizard/wizard.component';
import {BudgetComponent} from './budget/budget.component';
import {DatesComponent} from 'app/dates/dates.component';
import {NameAndCollaboratorsComponent} from './name-and-collaborators/name-and-collaborators.component';
import {DestinationComponent} from 'app/destination/destination.component';
import {ActivitiesComponent} from 'app/activities/activities.component';
import {MonthsComponent} from './months/months.component';
import {AllSalesComponent} from 'app/all-sales/all-sales.component';
const routes: Routes = [
  { path: '', redirectTo: '/app/boards', pathMatch: 'full' },
  {path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'signup', component: SignupComponent }
  ]},
  {path: 'app', component: RootComponent, children: [
    { path: 'boards', component: BoardsComponent, canActivate: [AuthGuardService] },
    { path: 'board/:id', component: BoardComponent, canActivate: [AuthGuardService, BoardGuardService] },
    { path: 'board/:id/collaborators', component: CollaboratorsComponent, canActivate: [AuthGuardService, BoardGuardService] },
    { path: 'board/:id/sales', component: AllSalesComponent, canActivate: [AuthGuardService, BoardGuardService] },
    { path: 'board', component: BoardComponent, canActivate: [AuthGuardService] },
    { path: 'board/:id/wizard', component: WizardComponent, canActivate: [AuthGuardService, BoardGuardService], children: [
      {path: 'name-and-collaborators', component: NameAndCollaboratorsComponent},
      {path: 'destination', component: DestinationComponent},
      {path: 'activities', component: ActivitiesComponent},
      {path: 'months', component: MonthsComponent},
      {path: 'budget', component: BudgetComponent},
      {path: 'dates', component: DatesComponent},
      {path: 'collaborators', component: CollaboratorsComponent}
    ]}
  ]}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
