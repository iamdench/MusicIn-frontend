import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Artist {
  name: string;
  link: string;
  // id: string;
  image: string;
  follower: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  constructor(private httpSpotyClient: HttpClient) { }

  AUTH = 'https://accounts.spotify.com/authorize?client_id=643d8c5dec96435495f32816fb2497e1&response_type=code&redirect_uri=http://localhost:4200/login&scope=user-read-private user-read-email';

  // tslint:disable-next-line:variable-name
  clientId = '643d8c5dec96435495f32816fb2497e1';

  // tslint:disable-next-line:variable-name
  clientSecret = '5745fe579ced46a4afdb7edab0a6d344';

  loginSpotify(): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        grant_type: 'client_credentials'
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${this.clientId}` + ':' + `${this.clientSecret}`)
      })
    };

    return this.httpSpotyClient.post('https://accounts.spotify.com/api/token', params, httpOptions);
  }

  getTrack(id: string): Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    })
  };

  return this.httpSpotyClient.get(`https://api.spotify.com/v1/tracks/${id}`, httpOptions);
  }

  getArtist(id: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };

    return this.httpSpotyClient.get(`https://api.spotify.com/v1/artists/${id}`, httpOptions);
  }

}