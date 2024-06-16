import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  private readonly API_URL = environment.apiURLV1;

  constructor(
    private http: HttpClient
  ) { }

  deleteWarehouse(id: number) {
    return this.http.delete(`${this.API_URL}/warehouse/${id}`);
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.API_URL}/customers/${id}`);
  }

  deleteSupplier(id: number) {
    return this.http.delete(`${this.API_URL}/suppliers/${id}`);
  }
  deleteDelivery(id: number) {
    return this.http.delete(`${this.API_URL}/delivery/${id}`);
  }

  deleteInvoices(id: number) {
    return this.http.delete(`${this.API_URL}/invoices/${id}`);
  }

  deleteOrders(id: number) {
    return this.http.delete(`${this.API_URL}/orders/${id}`);
  }

  deleteOrdersSupplier(id: number) {
    return this.http.delete(`${this.API_URL}/suppliersOrder/${id}`);
  }

  deleteProducts(id: number) {
    return this.http.delete(`${this.API_URL}/products/${id}`);
  }

  deleteTrading(id: number) {
    return this.http.delete(`${this.API_URL}/trading/${id}`);
  }
}
