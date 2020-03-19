import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppAuthGuard } from './app.authguard';
import { HomeComponent } from './home';
import { ResultsPageComponent } from './vote/results-page/results-page.component';
import { VotePageComponent } from './vote/vote-page/vote-page.component';
import { VoteAdminPageComponent } from './vote/vote-admin-page/vote-admin-page.component';
import { AuthViewComponent } from './auth-component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: ['USER']
    }
  },
  {
    path: 'results',
    component: ResultsPageComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'vote',
    component: VotePageComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: ['USER']
    }
  },
  {
    path: 'admin',
    component: VoteAdminPageComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: ['super-user']
    }
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
