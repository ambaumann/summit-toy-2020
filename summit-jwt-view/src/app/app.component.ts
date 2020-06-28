import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { VoteService } from './vote/vote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  value: String;
  opened: boolean;

  constructor(public voteService: VoteService, public router: Router) {
    const helper = new JwtHelperService();

    // keycloak.getToken().then(token => {
    //   const decodedToken = helper.decodeToken(token);
    //   this.value = decodedToken;

    //   //this.value = atob(token.split('.')[1]);
    // });

  }

  logOut() {
    this.voteService.logout().subscribe(bool => {
      console.log("logged out");
      this.router.navigate(['/results']);
    });
  }
}
