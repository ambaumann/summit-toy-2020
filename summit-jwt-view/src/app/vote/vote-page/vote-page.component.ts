import { Component, OnInit } from '@angular/core';
import { VoteService } from '../vote.service';
import { Vote } from '../model';

@Component({
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.css']
})
export class VotePageComponent implements OnInit {

  vote: Vote;

  name: string;

  constructor(public voteService: VoteService) {
    voteService.getUsername().subscribe(name => {
      this.name = name.toUpperCase();
    });
  }

  ngOnInit(): void {
    this.voteService.getPersonalVote().subscribe(vote => {
      this.vote = vote;
    });
  }

  voteCat(): void {
    this.voteService.voteCat().subscribe(vote => {
      this.vote = vote;
    });
  }

  voteDog(): void {
    this.voteService.voteDog().subscribe(vote => {
      this.vote = vote;
    });
  }

}
