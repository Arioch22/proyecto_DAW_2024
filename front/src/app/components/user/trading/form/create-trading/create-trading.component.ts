import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseApiLoginService } from '../../../../../services/response-api-login.service';
import { AuthService } from '../../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-trading',
  templateUrl: './create-trading.component.html',
  styleUrl: './create-trading.component.scss',
})
export class CreateTradingComponent {
  deliveryUser: FormGroup;
  errors: any;  //debo de quitar los any para implementar los interfaces, por falta de tiempo no lo hice

  constructor(
    private fb: FormBuilder,
    private responseApiLoginService: ResponseApiLoginService,
    private router: Router,
    private authService: AuthService
  ) {
    const userId = this.responseApiLoginService.getApiResponse().id || '';
    const userEmail = this.responseApiLoginService.getApiResponse().email || '';
    const userName = this.responseApiLoginService.getApiResponse().name || '';

    this.deliveryUser = this.fb.group({
      userId: [userId],
      name: [userName],
      dni: [''],
      address: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      phone: [''],
      email: [userEmail],
    });
  }

  onSubmit(): void {
    this.cleanErrors();
    this.authService.registerTrading(this.deliveryUser.value).subscribe(
      (response) => this.handleResponse(response),
      (errors) => this.handleError(errors)
    );

    console.log(this.deliveryUser.value);
  }

  private handleResponse(response: any): void {
    this.router.navigateByUrl('/dashboard');
  }

  private handleError(message: any): void {
    this.errors = message.error.errors;
  }

  private cleanErrors(): void {
    this.errors = null;
  }
}
