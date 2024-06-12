import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseApiLoginService } from '../../../services/response-api-login.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.scss'
})
export class WarehouseComponent {

  warehouseUser: FormGroup;
  errors: any;

  constructor(
    private fb: FormBuilder,
    private responseApiLoginService: ResponseApiLoginService,
    private router: Router,
    private authService: AuthService
  ) {
    const userId = this.responseApiLoginService.getApiResponse().id || '';
    const userEmail = this.responseApiLoginService.getApiResponse().email || '';
    const userName = this.responseApiLoginService.getApiResponse().name || '';

    this.warehouseUser = this.fb.group({
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
    this.authService.registerWarehouse(this.warehouseUser.value).subscribe(
      (response) => this.handleResponse(response),
      (errors) => this.handleError(errors)
    );

    console.log(this.warehouseUser.value);
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
