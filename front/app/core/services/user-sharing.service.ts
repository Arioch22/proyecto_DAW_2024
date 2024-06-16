import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User{
  id: string | null;
  name: string | null;
  email: string | null;
  email_verified_at?: string | null;
  rol_id: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}


@Injectable({
  providedIn: 'root',
})
export class UserSharingServiceInit {
  // BehaviorSubject is a type of subject, a subject is a special type of observable so you can subscribe to messages like any other observable.
  //Uso BehaviorSubject para compartir el usuario logueado entre componentes creando una interface User para siempre tener un usuario cuando se suscriban a este observable.
  private userSharingObservable: BehaviorSubject<User> =
    new BehaviorSubject<User>({
      id: 'Manuel',
      name: null,
      email: null,
      email_verified_at: null,
      rol_id: null,
      created_at: null,
      updated_at: null,
    });

    get userSharing(){
      return this.userSharingObservable.asObservable();
    }

    set userSharingData(user: User){
      this.userSharingObservable.next(user);
    }

  constructor() {}
}
