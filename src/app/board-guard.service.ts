import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {CollaboratorsService} from './collaborators.service';

@Injectable()
export class BoardGuardService implements CanActivate{
  constructor(
    private authService: AuthService,
    private collaboratorsService: CollaboratorsService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const boardId = route.params.id;
    return new Promise((resolve) => {
      this.authService.getUser()
        .then(auth => this.collaboratorsService.isCollaboratorAllowedToBoard(boardId, auth.email))
        .then(isCollaborator => resolve(isCollaborator));
      });
  }
}
