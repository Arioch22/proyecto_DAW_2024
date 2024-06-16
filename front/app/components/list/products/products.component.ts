import { Component, OnInit } from '@angular/core';
import { DataProducts } from '../../../models/resultsApi.model';
import { ProductService } from '../../../services/product.service';
import { DeleteService } from '../../../services/delete.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: DataProducts[] = [];

  constructor(
    private productService: ProductService,
    private deleteService: DeleteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      data => { this.products = data.data;
                this.sortProductsById();
      },
      error => console.error('Error fetching products:', error)
    );
  }

  private sortProductsById(): void {
    this.products.sort((a, b) => a.id - b.id);
  }

  public deleteProduct(id: number, event: Event): void {
    event.stopPropagation();
    Swal.fire({
      title: '¿Estás seguro de borrar el producto?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
      customClass: {
        actions: 'my-actions',
        confirmButton: 'btn btn-primary order-1',
        denyButton: 'btn btn-secondary order-2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteService.deleteProducts(id).subscribe(
          (data) => {
            Swal.mixin({
              toast: true,
              position: 'center',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              }
            }).fire({
              icon: 'success',
              title: 'Producto eliminado con éxito'
            });
            this.products = this.products.filter(product => product.id !== id);
            this.sortProductsById();
          },
          error => console.error('Error deleting product:', error)
        );
      }else if (result.isDenied) {
        Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        }).fire({
          icon: 'info',
          title: 'Producto no eliminado'
        });
      }
    });
  }

  viewProductDetail(id: number): void {
    this.router.navigate(['/editProduct', id]);
  }
}
