import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments';
import { Observable, empty, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { Vote, VoteResults } from './model';

@Injectable()
export class VoteApi {

  baseUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(private http: HttpClient, private keycloakAngular: KeycloakService) {
    // import environment
    this.baseUrl = environment.apis.voteService;
    // TODO when do we set a new token? Per call?
    keycloakAngular.getToken().then(tokenValue => {
      this.httpOptions.headers.set('Authorization', tokenValue);
    });
  }

  getUsername(): Observable<string> {
    const url = this.baseUrl + '/inspect/username';
    // { "username": "rachel" }
    return this.http.get<any>(url, this.httpOptions).pipe(map(value => value.username));
  }

  getAuthorizedUserRoles(): Observable<Array<string>> {
    const url = this.baseUrl + '/inspect/roles';
    return this.http.get<Array<string>>(url, this.httpOptions);
  }

  getAuthorizedUserAuthentication(): Observable<any> {
    const url = this.baseUrl + '/inspect/authentication';
    return this.http.get(url, this.httpOptions);
  }

  getResultsSummation(): Observable<VoteResults> {
    const url = this.baseUrl + '/public/vote/results';
    return this.http.get<VoteResults>(url, this.httpOptions);
  }

  getUserVote(username: string): Observable<Vote> {
    const url = this.baseUrl + '/vote/' + username;
    return this.http.get<Vote>(url, this.httpOptions).pipe(
      catchError(err => {
        console.log('caught error getting vote, providing fallback value');
        return EMPTY;
      })
    );
  }

  getListOfAllVotes(): Observable<Array<Vote>> {
    const url = this.baseUrl + '/vote';
    return this.http.get<Array<Vote>>(url, this.httpOptions);
  }

  postVote(vote: Vote): Observable<Vote> {
    const url = this.baseUrl + '/vote';
    return this.http.post<void>(url, vote, this.httpOptions).pipe(map(() => vote));
  }

  resetVotes(): Observable<boolean> {
    const url = this.baseUrl + '/vote/action/reset';
    return this.http.post<void>(url, this.httpOptions).pipe(map(() => true));
  }
}
