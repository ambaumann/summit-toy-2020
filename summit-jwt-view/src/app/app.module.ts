import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './utils/app-init';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthViewComponent } from './auth-component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultsPageComponent } from './vote/results-page/results-page.component';
import { VoteAdminPageComponent } from './vote/vote-admin-page/vote-admin-page.component';
import { VotePageComponent } from './vote/vote-page/vote-page.component';
import { VoteApi } from './vote/vote-api';

let keycloakService: KeycloakService = new KeycloakService();
@NgModule({
  declarations: [
    AppComponent,
    AuthViewComponent,
    ResultsPageComponent,
    VoteAdminPageComponent,
    VotePageComponent
  ],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
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
    },
    VoteApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
