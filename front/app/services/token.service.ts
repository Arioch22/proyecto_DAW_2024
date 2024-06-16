import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handleToken(token: string): void {
    localStorage.setItem('acces_api_fact', token);
  }

  getToken() {
    // return decryptPassword(localStorage.getItem('acces_token') as string, localStorage.getItem('key') as string);
    return localStorage.getItem('acces_api_fact') as string | null;
  }

  revokeToken(): void {
    localStorage.removeItem('acces_api_fact');
    localStorage.removeItem('api_data');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

}

function saveToSessionStorage(key: string, value: string, secretKey: string): void {
  const hashedValue = CryptoJS.AES.encrypt(value, secretKey).toString();
  sessionStorage.setItem(key, hashedValue);
}
