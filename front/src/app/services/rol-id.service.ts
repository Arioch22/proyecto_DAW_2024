import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class RolIdService {

  private readonly secretKey = environment.secretKey;

  constructor() { }

  handleRolId(rol_id: number): void {
    const local = CryptoJS.AES.encrypt(JSON.stringify(rol_id), this.secretKey).toString();
    localStorage.setItem('rol_id', local);
  }

  handleID(id: string): void {
    const local = CryptoJS.AES.encrypt(JSON.stringify(id), this.secretKey).toString();
    localStorage.setItem('id', local);
  }

  getRolID(){
    const key = localStorage.getItem('rol_id');
    const keyDecrypted = CryptoJS.AES.decrypt(key as string, this.secretKey).toString(CryptoJS.enc.Utf8);
    return keyDecrypted;
  }

  revokeRolID(){
    localStorage.removeItem('rol_id');

  }
}

