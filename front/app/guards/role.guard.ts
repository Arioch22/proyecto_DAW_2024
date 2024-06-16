import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RolIdService } from '../services/rol-id.service';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

export const roleGuard: CanActivateFn = (route, state) => {



  const expectedRole = environment.expectRoleAdmin;
  const rol_id = inject(RolIdService).getRolID();

  if(rol_id && rol_id == expectedRole){
    return true;
  }
  inject(Router).navigateByUrl('/login');
  return false;
};
