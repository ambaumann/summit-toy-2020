import { Component } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.css']
})
export class AuthViewComponent {

  value: String;

  constructor() {
    const helper = new JwtHelperService();



    // keycloak.getToken().then(token => {
    //   const decodedToken = helper.decodeToken(token);
    //   this.value = decodedToken;

    //   //this.value = atob(token.split('.')[1]);
    // });

  }
}
