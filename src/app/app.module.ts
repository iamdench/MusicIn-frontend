import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    iconsPathFactory,
    TUI_ICONS_PATH,
    TuiButtonModule,
    TuiDataListModule,
    TuiRootModule, TuiSvgModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiMarkerIconModule, TuiMultiSelectModule,
  TuiSelectModule
} from '@taiga-ui/kit';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PlatformComponent } from './platform/platform.component';
import { UserCardComponent } from './platform/user-card/user-card.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PlatformComponent,
    UserCardComponent
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
        TuiDataListWrapperModule,
        TuiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        TuiSelectModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        HttpClientModule,
        TuiMultiSelectModule,
        FontAwesomeModule,
        TuiSvgModule,
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
