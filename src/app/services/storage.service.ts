import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  lotOut(): void {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('spotyToken');
  }

  setAccToken(token: string): void {
    sessionStorage.setItem('accessToken', token);
}

  setSpotyToken(token: string): void{
    sessionStorage.setItem('spotyToken', token);
  }

  setCurUser(token: string): void{
    sessionStorage.setItem('currentUser', token)
  }

  getSpotyToken(): string{
    return sessionStorage.getItem('spotyToken');
  }

  getAccToken(): string{
    return sessionStorage.getItem('accessToken');
  }

  getUser(): string{
    return  sessionStorage.getItem('currentUser');
  }

  checkCurUser(): boolean {
    return !!sessionStorage.getItem('currentUser');
  }

  checkAccToken(): boolean{
    return !!sessionStorage.getItem('accessToken');
    }
}

