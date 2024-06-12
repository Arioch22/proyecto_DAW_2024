import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { DataStatus, resultStatus } from '../models/resultsApi.model';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private readonly url = environment.apiURLV1;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getStatus(): Observable<resultStatus> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<resultStatus>(`${this.url}/status`, { headers });
  }
}
