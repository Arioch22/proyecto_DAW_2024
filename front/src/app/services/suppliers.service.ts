import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';
import { DataSuppliers, resultSuppliers,resultOrderSuppliers, resultOrderSupplier, resultOrderSupplierGet } from '../models/resultsApi.model';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private readonly url = environment.apiURLV1;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }
  getSuppliers(): Observable<resultSuppliers> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultSuppliers>(`${this.url}/suppliers`, { headers });
  }

  getSupplierById(id: number): Observable<resultSuppliers> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultSuppliers>(`${this.url}/suppliers/${id}`, { headers });
  }

  updateSupplier(id: number, supplier: Partial<DataSuppliers>): Observable<resultSuppliers> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<resultSuppliers>(`${this.url}/suppliers/${id}`, supplier, { headers });
  }

  getOrderSupplier(): Observable<resultOrderSuppliers> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultOrderSuppliers>(`${this.url}/suppliersOrder`, { headers });
  }

  getOrderSupplierById(id: number): Observable<resultOrderSuppliers> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultOrderSuppliers>(`${this.url}/suppliersOrder?warehouseId[eq]=${id}`, { headers });
  }

  getOrderSupplierLines(id: number): Observable<resultOrderSupplierGet> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultOrderSupplierGet>(`${this.url}/SuppliersOrderRow?orderId[eq]=${id}`, { headers });
  }
}
