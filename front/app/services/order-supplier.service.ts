import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';
import { resultOrderSupplier, DataOrdersSupplierCreate } from '../models/resultsApi.model';

@Injectable({
  providedIn: 'root'
})
export class OrderSupplierService {

  private readonly url = environment.apiURLV1;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getOrders(): Observable<resultOrderSupplier> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultOrderSupplier>(`${this.url}/suppliersOrder`, { headers });
  }

  createOrder(orderData: DataOrdersSupplierCreate): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.url}/suppliersOrder`,orderData ,{headers });
  }

  createOrderRows(orderLinesData: any[]): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.url}/suppliersOrderRow/bulk`,orderLinesData, { headers });
  }

  getOrdersLines(orderId: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.url}/suppliersOrderRow?orderId[eq]=${orderId}`, { headers });
  }
}
