import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Vote, VoteResults } from './model';

@Injectable()
export class VoteApi {

  baseUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      //Authorization: 'my-auth-token'
      // 'Access-Control-Allow-Origin': '*'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) {
    // import environment
    this.baseUrl = environment.apis.voteService;
    // TODO when do we set a new token? Per call?
    //keycloakAngular.getToken().then(tokenValue => {
      //this.httpOptions.headers.set('Authorization', tokenValue);
    //});
  }

  getUsername(): Observable<string> {
    const url = this.baseUrl + '/inspect/username';
    // { "username": "rachel" }
    return this.http.get<any>(url, this.httpOptions).pipe(map(value => value.username)).pipe(
      catchError(err => {
        if(err.status === 401) {
          window.location.href='https://keycloak-gatekeeper-summit2020.apps-crc.testing/oauth/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A4200';
        }
        return EMPTY;
      }));;
  }

  getAuthorizedUserRoles(): Observable<Array<string>> {
    const url = this.baseUrl + '/inspect/roles';
    return this.http.get<Array<string>>(url, this.httpOptions).pipe(
      catchError(err => {
        if(err.status === 401) {
          window.location.href='https://keycloak-gatekeeper-summit2020.apps-crc.testing/oauth/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A4200';
        }
        return EMPTY;
      }));
  }

  getAuthorizedUserAuthentication(): Observable<any> {
    const url = this.baseUrl + '/inspect/authentication';
    return this.http.get(url, this.httpOptions).pipe(
      catchError(err => {
        if(err.status === 401) {
          window.location.href='https://keycloak-gatekeeper-summit2020.apps-crc.testing/oauth/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A4200';
        }
        throw err;
      }));;
  }

  getResultsSummation(): Observable<VoteResults> {
    const url = this.baseUrl + '/public/vote/results';
    return this.http.get<VoteResults>(url, this.httpOptions).pipe(
      catchError(err => {
        if(err.status === 401) {
          window.location.href='https://keycloak-gatekeeper-summit2020.apps-crc.testing/oauth/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A4200';
        }
        throw err;
      }));;
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
    return this.http.get<Array<Vote>>(url, this.httpOptions).pipe(
      catchError(err => {
        if(err.status === 401) {
          window.location.href='https://keycloak-gatekeeper-summit2020.apps-crc.testing/oauth/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A4200';
        }
        console.log('caught error getting vote, providing fallback value');
        return EMPTY;
      })
    );
  }

  postVote(vote: Vote): Observable<Vote> {
    const url = this.baseUrl + '/vote';
    return this.http.post<void>(url, vote, this.httpOptions).pipe(map(() => vote)).pipe(
      catchError(err => {
        if(err.status === 401) {
          window.location.href='https://keycloak-gatekeeper-summit2020.apps-crc.testing/oauth/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A4200';
        }
        throw err;
      }));
  }

  resetVotes(): Observable<boolean> {
    const url = this.baseUrl + '/vote/action/reset';
    return this.http.post<void>(url, null, this.httpOptions).pipe(map(() => true)).pipe(
      catchError(err => {
        if(err.status === 401) {
          window.location.href='https://keycloak-gatekeeper-summit2020.apps-crc.testing/oauth/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A4200';
        }
        throw err;
      }));
  }

  logout(): Observable<boolean> {
    const url = `https://keycloak-gatekeeper-summit2020.apps-crc.testing/oauth/logout?redirect_uri=http%3A%2F%2Flocalhost%3A4200`;
    return this.http.get<void>(url, this.httpOptions).pipe(map(() => true)).pipe(
      catchError(err => {
        if(err.status === 401) {
          window.location.href='https://keycloak-gatekeeper-summit2020.apps-crc.testing/oauth/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A4200';
        }
        throw err;
      }));
  }
}
