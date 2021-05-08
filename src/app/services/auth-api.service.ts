import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from './storage.service';
import {Artist} from './spotify-api.service';

export interface UserForm {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient,
              private storageService: StorageService) { }

  login(username: string, password: string): Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/auth/login', {'username': username, 'password': password}, httpOptions);
  }

  getMyProfile(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storageService.getAccToken()}`
      })
    };
    return this.http.get(`http://localhost:3000/profile`, httpOptions);
  }

   getArtists(): Observable<any> {
     return this.http.get(`http://localhost:3000/users`);
  }
}
