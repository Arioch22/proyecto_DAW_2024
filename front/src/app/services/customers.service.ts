import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';
import { DataCustomers, resultCustomers } from '../models/resultsApi.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private readonly url = environment.apiURLV1;
  private customersSubject = new ReplaySubject<any[]>(1);
  customers$ = this.customersSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getCustomers(): Observable<resultCustomers> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultCustomers>(`${this.url}/customers`, { headers }).pipe(
      tap(
        customers => this.customersSubject.next(customers.data)
      ));
  }

  getCustomerById(id: number): Observable<resultCustomers> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultCustomers>(`${this.url}/customers/${id}`, { headers });
  }

  updateCustomer(id: number, customer: Partial<DataCustomers>): Observable<resultCustomers> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<resultCustomers>(`${this.url}/customers/${id}`, customer, { headers });
  }
}
