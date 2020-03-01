import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './utils/app-init';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

let keycloakService: KeycloakService = new KeycloakService();
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
