import { Component, NgModule, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RolIdService } from '../../services/rol-id.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { TradingService } from '../../services/trading.service';
import { ResponseApiLoginService } from '../../services/response-api-login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})

export class NavbarComponent {

  currentRoute: string = '';
  nameTrading: string = '';
  idUser: number = 0;


  constructor(
    private rolService: RolIdService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenService: TokenService,
    private tradingService: TradingService,
    private responseApi: ResponseApiLoginService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

    this.nameTrading = this.responseApi.getApiResponse().name;

}

logout(): void {
  this.authService.logout().subscribe(
    response => this.handleResponse(response),
    errors => this.handleErrors(errors)
  );
}

private handleResponse(response: any): void {
  console.log(response.message);
  this.tokenService.revokeToken();
  this.rolService.revokeRolID();
  this.tradingService.removeNameTrading();
  this.router.navigateByUrl('/login');
}

private handleErrors(errors: any): void {
  console.log(errors.error);
}

  rol = this.rolService.getRolID();

}
