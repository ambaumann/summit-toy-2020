import { Component, OnInit } from '@angular/core';
import { VoteService } from '../vote.service';
import { Vote } from '../model';

@Component({
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.css']
})
export class VotePageComponent implements OnInit {

  vote: Vote;

  constructor(public voteService: VoteService) { }

  ngOnInit(): void {
    this.vote = this.voteService.getPersonalVote();
  }

  voteCat(): void {
    this.vote = this.voteService.voteCat();
  }

  voteDog(): void {
    this.vote = this.voteService.voteDog();
  }

}
