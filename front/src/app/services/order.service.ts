import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';
import { DataOrdersCreate, resultProducts } from '../models/resultsApi.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly url = environment.apiURLV1;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getOrders(): Observable<resultProducts> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultProducts>(`${this.url}/orders`, { headers });
  }

  createOrder(orderData: DataOrdersCreate): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.url}/orders`,orderData ,{headers });
  }

  createOrderRows(orderLinesData: any[]): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.url}/ordersRows/bulk`,orderLinesData, { headers });
  }

  getOrdersLines(orderId: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.url}/ordersRows?customer_order_id[eq]=${orderId}`, { headers });
  }
}
