import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router,
              private storageService: StorageService) { }

  toPlarform(): void{
    this.router.navigate(['/']);
  }

  toAuth(): void{
  this.router.navigate(['/login']);
  this.storageService.lotOut();
  }
}
