import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';
import { DataIva, resultIva } from '../models/resultsApi.model';

@Injectable({
  providedIn: 'root'
})
export class IvaService {

  private readonly url = environment.apiURLV1;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getIva(): Observable<resultIva> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultIva>(`${this.url}/iva`, { headers });
  }
}
