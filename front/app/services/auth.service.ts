import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthCredentials } from '../models/auth-credentials.model';
import { UserRegister } from '../models/user-register.model';
import { Product } from '../models/product.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

private readonly API_URL = environment.apiURL;
private readonly API_URLV1 = environment.apiURLV1;

  constructor(private http: HttpClient) { }

  login(credentials: AuthCredentials): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  register(user: UserRegister): Observable<any> {
    return this.http.post(`${this.API_URLV1}/register`, user)
  }

  registerTrading(user: UserRegister): Observable<any> {
    return this.http.post(`${this.API_URLV1}/trading`, user)
  }

  registerSupplier(user: UserRegister): Observable<any> {
    return this.http.post(`${this.API_URLV1}/suppliers`, user)
  }

  registerWarehouse(user: UserRegister): Observable<any> {
    return this.http.post(`${this.API_URLV1}/warehouse`, user)
  }

  registerCustomer(user: UserRegister): Observable<any> {
    return this.http.post(`${this.API_URLV1}/customers`, user)
  }

  registerProduct(product: Product): Observable<any> {
    return this.http.post(`${this.API_URLV1}/products`, product)
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.API_URL}/logout`, {})
  }
}
