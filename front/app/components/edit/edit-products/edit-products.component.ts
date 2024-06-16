import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { DataProducts, resultProducts} from '../../../models/resultsApi.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.scss'
})

export class EditProductsComponent implements OnInit{

  // product: DataProducts[] = [];
  productForm: FormGroup;
  productId: number;
  product: DataProducts[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ){
    //
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      // price: ['', Validators.pattern('^[0-9]+$')],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      stock_min: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]]
    });
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
      this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProductsById(this.productId).subscribe(
      (product) => {
        this.productForm.patchValue(product.data);
      },
      error => console.error('Error fetching product:', error)
    );
  }

  onSubmit(): void {
    if(this.productForm.valid){
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe(
        data => {
          console.log('Product upadted:', data);
        },
        error => console.error('Error updating product:', error)
      );
      Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      }).fire({
        icon: "success",
        title: "Actualizado con éxito."
      });
      this.router.navigate(['/listProducts']);
    }
  }


}
