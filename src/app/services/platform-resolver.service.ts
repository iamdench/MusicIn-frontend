import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Profile} from '../interfaces/profile';
import {Observable} from 'rxjs';
import {AuthApiService} from './auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformResolverService implements Resolve<Profile>{

  constructor(private authApiService: AuthApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<any> | Promise<any> | Profile {
    return this.authApiService.getMyProfile();
  }
}
