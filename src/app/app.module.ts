import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import { BoardsComponent } from './boards/boards.component';
import {AppRoutingModule} from './app-routing.module';
import { RootComponent } from './root/root.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from './auth.service';
import { LogoutComponent } from './logout/logout.component';
import { BoardComponent } from './board/board.component';
import {BoardService} from './board.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import {BoardGuardService} from './board-guard.service';
import { BoardNameComponent } from './board-name/board-name.component';
import { BudgetComponent } from './budget/budget.component';
import {FirebaseUtilsService} from 'app/firebase-utils.service';
import {BoardNameService} from './board-name.service';
import {BudgetService} from './budget.service';
import {CollaboratorsService} from './collaborators.service';
import { DatesComponent } from './dates/dates.component';
import {DatesService} from './dates.service';
import { ObjectToArrayPipe } from './object-to-array.pipe';
import { WizardComponent } from './wizard/wizard.component';
import { NameAndCollaboratorsComponent } from './name-and-collaborators/name-and-collaborators.component';
import { DestinationComponent } from './destination/destination.component';
import {DestinationService} from './destination.service';
import { ActivitiesComponent } from './activities/activities.component';
import {ActivitiesService} from './activities.service';
import { MonthsComponent } from './months/months.component';
import {MonthsService} from './months.service';
import { AllSalesComponent } from './all-sales/all-sales.component';
import {SalesService} from './sales.service';
import {HttpClientModule} from '@angular/common/http';
import { SaleCardComponent } from './sale-card/sale-card.component';
import { FilterSalesPipe } from './filter-sales.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    RootComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    BoardComponent,
    CollaboratorsComponent,
    BoardNameComponent,
    BudgetComponent,
    DatesComponent,
    ObjectToArrayPipe,
    WizardComponent,
    NameAndCollaboratorsComponent,
    DestinationComponent,
    ActivitiesComponent,
    MonthsComponent,
    AllSalesComponent,
    SaleCardComponent,
    FilterSalesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AuthService,
    BoardGuardService,
    BoardService,
    FirebaseUtilsService,
    BoardNameService,
    BudgetService,
    CollaboratorsService,
    DatesService,
    DestinationService,
    ActivitiesService,
    MonthsService,
    SalesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
