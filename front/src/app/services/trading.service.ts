import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';
import { resultsTrading, trading } from '../models/resultsApi.model';


@Injectable({
  providedIn: 'root'
})
export class TradingService {

  private readonly url = environment.apiURL;
  private readonly url2 = environment.apiURLV1;
  private readonly secretKey = environment.secretKey;

  constructor(private http: HttpClient,
              private tokenService: TokenService
  ) { }

  getTradingNameByUserID(userId: number): Observable<{tradingName: string}>{
    return this.http.get<{ tradingName: string}>(`${this.url}/trading/${userId}`);
  }

  getTrading(userId: number): Observable<resultsTrading>{
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.url2}/trading?user_id[eq]=${userId}`);
  }

  codifyNameTrading(name: string): void {
    const nameTrading = CryptoJS.AES.encrypt(JSON.stringify(name), this.secretKey).toString();
    console.log('El nombre codificado es: ',nameTrading);
    localStorage.setItem('nameTrading', nameTrading);

    const key = localStorage.getItem('nameTrading');
    const keyDecrypted = CryptoJS.AES.decrypt(key as string, this.secretKey).toString(CryptoJS.enc.Utf8);
    console.log('El nombre descodificado es: ',keyDecrypted);
  }

  removeNameTrading(): void {
    localStorage.removeItem('nameTrading');
  }
}
