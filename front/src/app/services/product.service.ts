import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';
import { DataProducts, resultProducts } from '../models/resultsApi.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly url = environment.apiURLV1;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getProducts(): Observable<resultProducts> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultProducts>(`${this.url}/products`, { headers });
  }

  getProductsById(id: any): Observable<resultProducts> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultProducts>(`${this.url}/products/${id}`, { headers });
  }

  updateProduct(id: number, stockNuevo: number): Observable<resultProducts> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.patch<resultProducts>(`${this.url}/products/${id}`, stockNuevo, { headers });
  }

  updateProductStock(id: number, stock: number): Observable<resultProducts> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const body = { stock };

    return this.http.patch<resultProducts>(`${this.url}/products/${id}`, body, { headers });
  }
}
