import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {PlatformComponent} from './platform/platform.component';
import {PlatformGuard} from './platform/platform.guard';


const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: '',
    component: PlatformComponent,
    canActivate: [PlatformGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PlatformGuard]
})
export class AppRoutingModule { }
