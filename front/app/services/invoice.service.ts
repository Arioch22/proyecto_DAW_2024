import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';
import { DataOrders, DataOrdersCreate, DataProducts, resultProducts } from '../models/resultsApi.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private readonly url = environment.apiURLV1;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getInvoices(): Observable<resultProducts> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultProducts>(`${this.url}/invoices`, { headers });
  }

  createInvoice(invoiceData: DataOrdersCreate): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.url}/invoices`,invoiceData ,{headers });
  }

  createInvoiceRows(invoiceLinesData: any[]): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.url}/invoicesRows/bulk`,invoiceLinesData, { headers });
  }

  getInvoicesLines(invoiceId: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.url}/invoicesRows?customer_invoice_id[eq]=${invoiceId}`, { headers });
  }

  getOrdersLines(orderId: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.url}/ordersRows?customer_order_id[eq]=${orderId}`, { headers });
  }
}
