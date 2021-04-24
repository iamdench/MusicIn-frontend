import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {PlatformComponent} from './platform/platform.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: '**',
    component: PlatformComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
