import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ResultsPageComponent } from './vote/results-page/results-page.component';
import { VotePageComponent } from './vote/vote-page/vote-page.component';
import { VoteAdminPageComponent } from './vote/vote-admin-page/vote-admin-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/results',
    pathMatch: 'full'
  },
  {
    path: 'results',
    component: ResultsPageComponent
  },
  {
    path: 'vote',
    component: VotePageComponent,
    data: {
      roles: ['USER']
    }
  },
  {
    path: 'admin',
    component: VoteAdminPageComponent,
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
