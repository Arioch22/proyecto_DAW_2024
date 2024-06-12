import { Component, OnInit } from '@angular/core';
import { DeleteService } from '../../../services/delete.service';
import { DataCustomers } from '../../../models/resultsApi.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CustomersService } from '../../../services/customers.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {

  customers: DataCustomers[] = [];

  constructor(
    private deleteService: DeleteService,
    private customersService: CustomersService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe(
      data => {
                this.customers = data.data.filter(customer => customer.id !== 1);
                this.sortCustomersById();
      },
      error => console.error('Error fetching customers:', error)
    );
  }

  private sortCustomersById(): void {
    this.customers.sort((a, b) => a.id - b.id);
  }

  public deleteCustomer(id: number, event: Event): void {
    event.stopPropagation();
    Swal.fire({
      title: '¿Estás seguro de borrar el cliente?',
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
        this.deleteService.deleteCustomer(id).subscribe(
          (data) => {
            console.log('Customer deleted:', data);
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
              title: 'Cliente eliminado'
            });
            this.customers = this.customers.filter(customer => customer.id !== id);
          },
          error => console.error('Error deleting customer:', error)
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
          title: 'Cliente no eliminado'
        });
      }
    });
  }

  viewCustomerDetails(id: number): void {
    this.router.navigate([`/editCustomer/${id}`]);
  }

}
