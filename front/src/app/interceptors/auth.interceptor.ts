import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable} from "rxjs";
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const token = this.tokenService.getToken();

      if (token) {

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
       });
      }

    return next.handle(request);
  }

}


