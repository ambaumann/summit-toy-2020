import { Component, OnInit } from '@angular/core';
import { VoteService } from '../vote.service';
import { VoteResults } from '../model';

@Component({
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {

  catCount: number;
  dogCount: number;

  constructor(public voteService: VoteService) { }

  ngOnInit(): void {
    const voteResults: VoteResults = this.voteService.getVoteResults();
    this.catCount = voteResults.catVotes;
    this.dogCount = voteResults.dogVotes;
  }

}
