import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {iconsPathFactory, TUI_ICONS_PATH, TuiButtonModule, TuiRootModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule, TuiInputPasswordModule, TuiMarkerIconMode, TuiMarkerIconModule} from '@taiga-ui/kit';
import {ReactiveFormsModule} from '@angular/forms';
import { PlatformComponent } from './platform/platform.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PlatformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiMarkerIconModule,
  ],
  providers: [
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/'),
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
