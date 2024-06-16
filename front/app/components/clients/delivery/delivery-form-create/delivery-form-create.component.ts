import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseApiLoginService } from '../../../../services/response-api-login.service';

@Component({
  selector: 'app-delivery-form-create',
  templateUrl: './delivery-form-create.component.html',
  styleUrl: './delivery-form-create.component.scss'
})
export class DeliveryFormCreateComponent {

deliveryUser: FormGroup;

constructor (
  private fb: FormBuilder,
  private responseApiLoginService: ResponseApiLoginService
){
  const userId = this.responseApiLoginService.getApiResponse().id || '';
  const userEmail = this.responseApiLoginService.getApiResponse().email || '';
  const userName = this.responseApiLoginService.getApiResponse().name || '';

  this.deliveryUser = this.fb.group({


    user_id: [userId],
    name: [userName],
    dni: [''],
    address: [''],
    city: [''],
    state: [''],
    postalCode: [''],
    phone: [''],
    email: [userEmail]
  });
}

ngOnInit(): void {

}

onSubmit(): void {
  this.deliveryUser.value;
}

}
