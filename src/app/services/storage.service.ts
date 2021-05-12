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
    sessionStorage.setItem('currentUser', token);
  }

  setUserId(id: string): void{
    sessionStorage.setItem('userId', id);
  }

  getUserId(): string{
    return  sessionStorage.getItem('userId');
  }

  getSpotyToken(): string{
    return sessionStorage.getItem('spotyToken');
  }

  getAccToken(): string{
    return sessionStorage.getItem('accessToken');
  }

  getCurUser(): string{
    return  sessionStorage.getItem('currentUser');
  }

  checkCurUser(): boolean {
    return !!sessionStorage.getItem('currentUser');
  }

  checkAccToken(): boolean{
    return !!sessionStorage.getItem('accessToken');
    }
}

