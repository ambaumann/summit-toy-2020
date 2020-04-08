import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Vote, VoteResults } from './model';
import { Observable } from 'rxjs';
import { VoteApi } from './vote-api';


@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private username: string;

  constructor(protected keycloakAngular: KeycloakService, private voteAPI: VoteApi) {
    this.username = keycloakAngular.getUsername();
  }

  public getUsername(): Observable<string> {
    return this.voteAPI.getUsername();
  }

  // no roles
  public getVoteResults(): Observable<VoteResults> {
    return this.voteAPI.getResultsSummation();
  }

  // user role
  public getPersonalVote(): Observable<Vote> {
    return this.voteAPI.getUserVote(this.username);
  }

  public voteCat(): Observable<Vote> {
    return this.vote('cat');
  }

  public voteDog(): Observable<Vote> {
    return this.vote('dog');
  }

  private vote(pick: string): Observable<Vote> {
    const vote: Vote = new Vote(this.username, pick);
    return this.voteAPI.postVote(vote);
  }

  // admin
  public getListOfVotes(): Observable<Array<Vote>> {
    return this.voteAPI.getListOfAllVotes();
  }

  public resetVote(): Observable<boolean> {
    return this.voteAPI.resetVotes();
  }
}
