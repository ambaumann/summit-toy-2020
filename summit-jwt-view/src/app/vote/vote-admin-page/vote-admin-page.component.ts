import { Component, OnInit } from '@angular/core';
import { Vote } from '../model/Vote';

@Component({
  templateUrl: './vote-admin-page.component.html',
  styleUrls: ['./vote-admin-page.component.css']
})
export class VoteAdminPageComponent implements OnInit {

  votes: Array<Vote> = new Array(
    new Vote('Bill', 'cat'),
    new Vote('Sarah', 'dog'));

  constructor() { }

  ngOnInit(): void {
  }

}
