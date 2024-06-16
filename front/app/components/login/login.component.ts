import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { RolIdService } from '../../services/rol-id.service';
import { TradingService } from '../../services/trading.service';
import { ResponseApiLoginService } from '../../services/response-api-login.service';
import { environment } from '../../../environments/environment.development';
import { User, UserSharingServiceInit } from '../../core/services/user-sharing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  errors: any;
  rolId: number | undefined;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder,
    private rolService: RolIdService,
    private tradingService: TradingService,
    private userSharingService: UserSharingServiceInit,
    private responseApiLoginService: ResponseApiLoginService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  OnInit(): void {
    if( this.tokenService.getToken() === null ) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit(): void {
    this.cleanErrors();
    this.authService.login(this.loginForm.value).subscribe(
      response => this.handleResponse(response),
      errors => this.handleError(errors)
    );
  }


  private handleResponse(response: any): void {
    if( this.tokenService.getToken() === null ) {
      this.tokenService.handleToken(response.token);
    };
    this.responseApiLoginService.handleApiResponse(response);
    this.rolService.handleRolId(response.user.rol_id);
    this.userSharingService.userSharingData = response.user;
    this.router.navigateByUrl('/dashboard');
  }

  private handleError(errors: any): void {
    this.errors = errors.error.errors;
    console.log('El error es: ',this.errors)
  }

  private handletrading(response: any): void{
    this.tradingService.getTradingNameByUserID(response.user.id)
  }


  private cleanErrors(): void {
    this.errors = null;
  }

}
