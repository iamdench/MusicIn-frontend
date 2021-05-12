import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {RegProfile} from '../interfaces/reg-profile';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  checkUserName(userData: RegProfile): Observable<RegProfile> | null {
 return this.http.get<RegProfile>(`http://localhost:3000/registration/user/${userData.username}`);
  }

  checkEmail(userData: RegProfile): Observable<RegProfile> | null {
    const params = new HttpParams().set('email', userData.email);
    return this.http.get<RegProfile>(`http://localhost:3000/registration/user`, { params } );
  }

  checkSpotifyId(userData: RegProfile): Observable<RegProfile> | null {
    const params = new HttpParams().set('spotifyLink', userData.spotifyLink);
    return this.http.get<RegProfile>(`http://localhost:3000/registration/spotify`, { params });
  }

  regNewUser(userData: RegProfile): Observable<RegProfile> {
    const body = userData;
    return this.http.post<RegProfile>(`http://localhost:3000/users`, {
      username: userData.username,
      password: userData.password,
      spotifyLink: userData.spotifyLink,
      spotifyId: userData.spotifyLink.substr(32),
      email: userData.email,
      myLikes: 0,
      iLked: [],
      likedMe: []
    });
  }
}
