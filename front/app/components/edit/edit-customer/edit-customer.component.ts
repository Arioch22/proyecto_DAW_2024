import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataCustomers } from '../../../models/resultsApi.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../../services/customers.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CustomValidationsService, validateCategory } from '../../../services/validations/custom-validations.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.scss'
})
export class EditCustomerComponent implements OnInit{

  customerForm: FormGroup;
  customerId: number;
  customer: DataCustomers[] = [];

  constructor(
    private route: ActivatedRoute,
    private customersService: CustomersService,
    private fb: FormBuilder,
    private router: Router

  ) {

    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', [Validators.required, validateCategory()]],
      cifnif: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
  });

  this.customerId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer(): void{
    this.customersService.getCustomerById(this.customerId).subscribe(
      (customer) => {
        this.customerForm.patchValue(customer.data);
      },
      error => console.error('Error fetching customer:', error)
    );
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.customersService.updateCustomer(this.customerId, this.customerForm.value).subscribe(
        data => {
          console.log('Customer updated:', data);
        },
        error => console.error('Error updating customer:', error)
      );
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
        title: 'Customer updated successfully'
      });
      this.router.navigate(['/listCustomers']);
    }
  }

}
