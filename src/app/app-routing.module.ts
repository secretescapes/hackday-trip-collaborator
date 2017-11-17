import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BoardsComponent} from './boards/boards.component';
import {RootComponent} from './root/root.component';
const routes: Routes = [
  { path: '', redirectTo: '/app/boards', pathMatch: 'full' },
  {path: 'app', component: RootComponent, children: [
    { path: 'boards', component: BoardsComponent }
  ]}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
