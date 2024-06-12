import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ResponseApiLoginService {


  private readonly secretKey = environment.secretKey;

  constructor() { }

  handleApiResponse(response: any): void{
    const dataToStore = response.user;
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(dataToStore), this.secretKey).toString();
    localStorage.setItem('api_data', encryptedData);
  }

  getApiResponse(): any {
    const encryptedData = localStorage.getItem('api_data');
    if(encryptedData){
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return data;
    }
    return null;
  }

  deleteApiResponse(): void {
    localStorage.removeItem('api_data');
  }
}
