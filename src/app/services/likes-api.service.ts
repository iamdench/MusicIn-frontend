import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LikesApiService {

  constructor(private http: HttpClient,
              private storageService: StorageService) { }

  like(artistId: string): Observable<any>{
    return this.http.post(`http://localhost:3000/users/like`, {user_liker_id: this.storageService.getUserId(), user_liked_id: artistId});
  }

  dislike(artistId: string): Observable<any>{
    return this.http.post(`http://localhost:3000/users/dislike`, {user_liker_id: this.storageService.getUserId(), user_liked_id: artistId});
  }

  getNameAndLink(id: string): Observable<any>{
    return this.http.get(`http://localhost:3000/users/${id}`);
  }
}
