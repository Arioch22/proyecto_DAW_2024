import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSuppliers } from '../../../models/resultsApi.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from '../../../services/suppliers.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { validateCategory } from '../../../services/validations/custom-validations.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.scss'
})
export class EditSupplierComponent implements OnInit{

  supplierForm: FormGroup;
  supplierId: number;
  supplier: DataSuppliers[] = [];

  constructor(
    private route: ActivatedRoute,
    private suppliersService: SuppliersService,
    private fb: FormBuilder,
    private router: Router

  ) {

    this.supplierForm = this.fb.group({
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

  this.supplierId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadSupplier();
  }

  loadSupplier(): void{
    this.suppliersService.getSupplierById(this.supplierId).subscribe(
      (supplier) => {
        this.supplierForm.patchValue(supplier.data);
      },
      error => console.error('Error fetching supplier:', error)
    );
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      this.suppliersService.updateSupplier(this.supplierId, this.supplierForm.value).subscribe(
        data => {
          console.log('Supplier updated:', data);
        },
        error => console.error('Error updating supplier:', error)
      );
      Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }).fire({
        icon: 'success',
        title: "Actualizado con éxito."
      });
      this.router.navigate(['/listSuppliers']);
    }
  }

}
