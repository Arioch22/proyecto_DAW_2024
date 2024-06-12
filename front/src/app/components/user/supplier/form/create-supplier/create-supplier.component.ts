import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseApiLoginService } from '../../../../../services/response-api-login.service';
import { AuthService } from '../../../../../services/auth.service';
import { Router } from '@angular/router';
import { RolIdService } from '../../../../../services/rol-id.service';


@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrl: './create-supplier.component.scss'
})
export class CreateSupplierComponent {
  supplierUser: FormGroup;
  errors: any;  //debo de quitar los any para implementar los interfaces, por falta de tiempo no lo hice


  constructor(
    private fb: FormBuilder,
    private responseApiLoginService: ResponseApiLoginService,
    private router: Router,
    private authService: AuthService,
    private rolIdService: RolIdService
  ) {

    this.supplierUser = this.fb.group({
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
    this.authService.registerSupplier(this.supplierUser.value).subscribe(
      (response) => this.handleResponse(response),
      (errors) => this.handleError(errors)
    );
  }

  private handleResponse(response: any): void {
    this.router.navigateByUrl('/listSuppliers');
  }

  private handleError(errors: any): void {
    this.errors = errors.error.errors;
  }

  private cleanErrors(): void {
    this.errors = null;
  }
}
