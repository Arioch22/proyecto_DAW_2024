import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { RouterLink } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ExistService {
  private readonly API_URL = environment.apiURLV1;

  constructor(private http: HttpClient) {}

  existTrading(clientId: number): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(
      `${this.API_URL}/trading?user_id[eq]=${clientId}`,
      { observe: 'response' }
    );
  }

  existWarehouse(clientId: number): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(
      `${this.API_URL}/warehouse?userId[eq]=${clientId}`,
      { observe: 'response' }
    );
  }
}
