import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Vote, VoteResults } from './model';


@Injectable({
  providedIn: 'root'
})
export class VoteService {

  // environment

  private votes: Array<Vote> = new Array(
    new Vote('Bill', 'cat'),
    new Vote('Sarah', 'dog'));

  private personalVote: Vote;
  private username: string;

  constructor(protected keycloakAngular: KeycloakService) {
    this.username = keycloakAngular.getUsername();
  }

  // no roles
  public getVoteResults(): VoteResults {
    return new VoteResults(this.votes.filter(vote => vote.vote === 'cat').length
    , this.votes.filter(vote => vote.vote === 'dog').length);
  }

  // user role
  public getPersonalVote(): Vote {
    return this.personalVote;
  }

  public voteCat(): Vote {
    return this.vote('cat');
  }

  public voteDog(): Vote {
    return this.vote('dog');
  }

  private vote(pick: string): Vote {
    const vote: Vote = new Vote(this.username, pick);
    this.votes.push(vote);
    this.personalVote = vote;
    return vote;
  }

  // admin
  public getListOfVotes(): Array<Vote> {
    return this.votes;
  }

  public resetVote(): void {
    this.votes.length = 0;
    this.personalVote = null;
  }


}
