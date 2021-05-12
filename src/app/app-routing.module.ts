import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {PlatformComponent} from './platform/platform.component';
import {PlatformGuard} from './platform/platform.guard';
import {PlatformResolverService} from './services/platform-resolver.service';
import {RegistrationComponent} from './registration/registration/registration.component';


const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: '',
    component: PlatformComponent,
    canActivate: [PlatformGuard],
    resolve: { currentUser: PlatformResolverService }
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
