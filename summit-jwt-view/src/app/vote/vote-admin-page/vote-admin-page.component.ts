import { Component, OnInit } from '@angular/core';
import { Vote } from '../model';
import { VoteService } from '../vote.service';

@Component({
  templateUrl: './vote-admin-page.component.html',
  styleUrls: ['./vote-admin-page.component.css']
})
export class VoteAdminPageComponent implements OnInit {

  votes: Array<Vote>;

  constructor(public voteService: VoteService) { }

  ngOnInit(): void {
    this.voteService.getListOfVotes().subscribe(votes => {
      this.votes = votes;
    });
  }

  resetVotes(): void {
    this.voteService.resetVote().subscribe(resetResult => {
      console.log('Reset: ' + resetResult);
      if (resetResult) {
        this.votes.length = 0;
        this.setVotes();
      }
    });

  }

  setVotes(): void {
    this.voteService.getListOfVotes().subscribe(votes => {
      this.votes = votes;
    });
  }
}
