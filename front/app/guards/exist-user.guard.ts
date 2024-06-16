// import { existUserGuardWarehouse } from './exist-user.guard';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ResponseApiLoginService } from '../services/response-api-login.service';
import { ExistService } from '../services/client/exist.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { RolIdService } from '../services/rol-id.service';


export const existUserGuardWarehouse: CanActivateFn = (route, state) => {
  const responseApiLoginService = inject(ResponseApiLoginService);
  const existService = inject(ExistService);
  const router = inject(Router);

  const apiResponseId = responseApiLoginService.getApiResponse().id;
  const rolIdService = inject(RolIdService).getRolID();


  return existService.existWarehouse(apiResponseId).pipe(
    map(response => {
      if ((response.body.data).length === 0 && rolIdService === '2') {
        router.navigateByUrl('/CreateWarehouse');
        return false;
      }

      return true;
    }
  ),
    catchError(() => {
      router.navigateByUrl('/');
      return of(false);
    }),

  );
};

export const existUserGuardWarehouseCreate: CanActivateFn = (route, state) => {
  const responseApiLoginService = inject(ResponseApiLoginService);
  const existService = inject(ExistService);
  const router = inject(Router);

  const apiResponseId = responseApiLoginService.getApiResponse().id;
  const rolIdService = inject(RolIdService).getRolID();

  return existService.existWarehouse(apiResponseId).pipe(
    map(response => {
      if ((response.body.data).length !== 0 || rolIdService === '3' || rolIdService === '1') {
        router.navigateByUrl('/dashboard');
        return false;
      }

      return true;
    }),
  );
};

export const exisUserGuardTradingCreate: CanActivateFn = (route, state) => {
  const responseApiLoginService = inject(ResponseApiLoginService);
  const existService = inject(ExistService);
  const router = inject(Router);

  const apiResponseId = responseApiLoginService.getApiResponse().id;
  const rolIdService = inject(RolIdService).getRolID();

  return existService.existTrading(apiResponseId).pipe(
    map(response => {
      console.log(response.body.data);
      if ((response.body.data).length !== 0 || rolIdService === '2' || rolIdService === '1') {
        router.navigateByUrl('/dashboard');
        return false;
      }

      return true;
    }),
  );
}





export const existUserGuardTrading: CanActivateFn = (route, state) => {
  const responseApiLoginService = inject(ResponseApiLoginService);
  const existService = inject(ExistService);
  const router = inject(Router);

  const apiResponseId = responseApiLoginService.getApiResponse().id;
  const rolIdService = inject(RolIdService).getRolID();


  return existService.existTrading(apiResponseId).pipe(
    map(response => {
      if ((response.body.data).length === 0 && rolIdService === '3') {
        console.log('esto es de tradding');
        console.log(response.body.data);
        router.navigateByUrl('/CreateTradingComponent');
        return false;
      }

      return true;
    }
  ),
    catchError(() => {
      router.navigateByUrl('/login');
      return of(false);
    }),

  );

};

export const controlUserGuardWarehouse: CanActivateFn = (route, state) => {
  const responseApiLoginService = inject(ResponseApiLoginService);
  const existService = inject(ExistService);
  const router = inject(Router);

  const apiResponseId = responseApiLoginService.getApiResponse().id;
  const rolIdService = inject(RolIdService).getRolID();


  if (rolIdService === '2' || rolIdService === '1') {
      return true;
    }

    router.navigateByUrl('dashboard');
    return false;
};

export const controlUserGuardTrading: CanActivateFn = (route, state) => {
  const responseApiLoginService = inject(ResponseApiLoginService);
  const existService = inject(ExistService);
  const router = inject(Router);

  const apiResponseId = responseApiLoginService.getApiResponse().id;
  const rolIdService = inject(RolIdService).getRolID();


  if (rolIdService === '3' || rolIdService === '1' ) {
    return true;
  }

  router.navigateByUrl('dashboard');
  return false;
};

export const  controlUserGuardExistTrading: CanActivateFn = (route, state) => {



  return true;
};


