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
    this.votes = this.voteService.getListOfVotes();
  }

  resetVotes(): void {
    this.voteService.resetVote();
    this.setVotes();
  }

  setVotes(): void {
    this.votes = this.voteService.getListOfVotes();
  }

}
