import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';
import { resultsTrading, resultsWarehouse } from '../models/resultsApi.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private readonly url = environment.apiURL;
  private readonly url2 = environment.apiURLV1;
  private readonly secretKey = environment.secretKey;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getWarehouseNameByUserID(userId: number): Observable<{ warehouseName: string }> {
    return this.http.get<{ warehouseName: string }>(`${this.url}/warehouse/${userId}`);
  }

  getWarehouse(userId: number): Observable<resultsTrading> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.url2}/warehouse?userId[eq]=${userId}`);
  }

  codifyNameWarehouse(name: string): void {
    const nameWarehouse = CryptoJS.AES.encrypt(JSON.stringify(name), this.secretKey).toString();
    console.log('El nombre codificado es: ', nameWarehouse);
    localStorage.setItem('nameWarehouse', nameWarehouse);

    const key = localStorage.getItem('nameTrading');
    const keyDecrypted = CryptoJS.AES.decrypt(key as string, this.secretKey).toString(CryptoJS.enc.Utf8);
    console.log('El nombre descodificado es: ', keyDecrypted);
  }

  removeNameWarehouse(): void {
    localStorage.removeItem('nameWarehouse');
  }
}
