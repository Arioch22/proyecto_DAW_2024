import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TokenService } from '../token.service';
import { resultsDelivery, resultsInvoice, resultsOrders, DataOrdersCreate } from '../../models/resultsApi.model';


@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private readonly url = environment.apiURLV1;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}

  getDeliveries(): Observable<resultsDelivery> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<resultsDelivery>(`${this.url}/delivery`, { headers });
  }

  getDeliveryByTradingID(tradingId: string): Observable<resultsDelivery> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<resultsDelivery>(`${this.url}/delivery?tradingId[eq]=${tradingId}`, { headers });
  }

  getOrders(): Observable<resultsOrders> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<resultsOrders>(`${this.url}/orders`, { headers });
  }

  getOrdersByTradingId(tradingId: string): Observable<resultsOrders> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<resultsOrders>(`${this.url}/orders?tradingId[eq]=${tradingId}`, { headers });
  }

  getInvoices(): Observable<resultsInvoice> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<resultsInvoice>(`${this.url}/invoices`, { headers });
  }

  getIdTrading(idUser: number): Observable<resultsOrders> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<resultsOrders>(`${this.url}/trading?userId[eq]=${idUser}`, { headers });
  }

  getInvoicesByTradingId(tradingId: number): Observable<resultsInvoice> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<resultsInvoice>(`${this.url}/invoices?tradingId[eq]=${tradingId}`, { headers });
  }

  createDelivery(deliveryData: DataOrdersCreate): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.url}/delivery`, deliveryData, { headers });
  }

  createDeliveryRows(deliveryLinesData: any[]): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.url}/deliveryRows/bulk`, deliveryLinesData, { headers });
  }

  getDeliveryLines(deliveryId: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.url}/deliveryRows?customer_delivery_note_id[eq]=${deliveryId}`, { headers });
  }
}
