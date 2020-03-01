import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtectedComponent } from './protected';
import { AppAuthGuard } from './app.authguard';
import { HomeComponent } from './home';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: ['secret-agent']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
