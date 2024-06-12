import { Component } from '@angular/core';
import { Product } from '../../../models/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  product: Product[] = [];
  formProduct: FormGroup;
  errors: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.formProduct = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      stock: [''],
      stock_min: ['']
    });
  }

  onSubmit(): void {
    this.cleanErrors();
    this.authService.registerProduct(this.formProduct.value).subscribe(
      (response) => this.handleResponse(response),
      (errors) => this.handleError(errors)
    );
  }


  private handleResponse(response: any): void {
    console.log(response.message);
    Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    }).fire({
      icon: 'success',
      title: 'Producto registrado con éxito'
    });
    this.router.navigateByUrl('/listProducts');
  }

  private handleError(errors: any): void {
    this.errors = errors.error.errors;
    console.log(this.errors);
  }

  private cleanErrors(): void {
    this.errors = null;
  }

}
