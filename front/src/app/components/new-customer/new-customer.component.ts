import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseApiLoginService } from '../../services/response-api-login.service';
import { AuthService } from '../../services/auth.service';
import { RolIdService } from '../../services/rol-id.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss',
})
export class NewCustomerComponent {
  customerUser: FormGroup;
  errors: any; //debo de quitar los any para implementar los interfaces, por falta de tiempo no lo hice

  constructor(
    private fb: FormBuilder,
    private responseApiLoginService: ResponseApiLoginService,
    private router: Router,
    private authService: AuthService,
    private rolIdService: RolIdService
  ) {
    this.customerUser = this.fb.group({
      name: [''],
      type: [''],
      cifnif: [''],
      address: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      phone: [''],
      email: [''],
    });
  }

  onSubmit(): void {
    this.cleanErrors();
    this.authService.registerCustomer(this.customerUser.value).subscribe(
      (response) => this.handleResponse(response),
      (errors) => this.handleError(errors)
    );
  }

  private handleResponse(response: any): void {
    console.log(response.message);
    this.router.navigateByUrl('/listCustomers');
  }

  private handleError(errors: any): void {
    this.errors = errors.error.errors;
    console.log(this.errors);
  }

  private cleanErrors(): void {
    this.errors = null;
  }
}
