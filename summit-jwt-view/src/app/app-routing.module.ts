import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


import { ProtectedComponent } from './protected';
import { AppAuthGuard } from './app.authguard';
import { HomeComponent } from './home';
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
    path: 'protected',
    component: ProtectedComponent,
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
