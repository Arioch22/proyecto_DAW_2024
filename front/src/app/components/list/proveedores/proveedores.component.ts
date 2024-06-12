import { Component, OnInit } from '@angular/core';
import { DeleteService } from '../../../services/delete.service';
import { DataSuppliers } from '../../../models/resultsApi.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SuppliersService } from '../../../services/suppliers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent implements OnInit{

  suppliers: DataSuppliers[] = [];

  constructor(
    private deleteService: DeleteService,
    private suppliersService: SuppliersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.suppliersService.getSuppliers().subscribe(
      data => {this.suppliers = data.data;
                this.sortSuppliersById();
      },
      error => console.error('Error fetching suppliers:', error)
    );
  }

  private sortSuppliersById(): void {
    this.suppliers.sort((a, b) => a.id - b.id);
  }

  public deleteSupplier(id: number, event: Event): void {
    event.stopPropagation();
    Swal.fire({
      title: '¿Estás seguro de borrar el proveedor?',
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
        this.deleteService.deleteSupplier(id).subscribe(
          (data) => {
            console.log('Supplier deleted:', data);
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
              title: 'Proveedor eliminado con éxito'
            });
            this.suppliers = this.suppliers.filter(supplier => supplier.id !== id);
          },
          error => console.error('Error deleting supplier:', error)
        );
      }else if(result.isDenied){
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
          title: 'Proveedor no eliminado'
        });
      }
    });
  }

  viewSupplierDetail(id: number): void {
    this.router.navigate(['/editSupplier', id]);
  }

}
