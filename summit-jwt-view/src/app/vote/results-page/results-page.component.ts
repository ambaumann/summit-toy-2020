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
    this.voteService.getVoteResults().subscribe(result => {
      this.dogCount = result.dogVotes;
      this.catCount = result.catVotes;
    });
  }

}
