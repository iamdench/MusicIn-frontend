import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  toPlarform(): void{
    this.router.navigate(['/']);
  }

  toAuth(): void{
  this.router.navigate(['/login']);
  localStorage.removeItem('currentUser');
  }
}
