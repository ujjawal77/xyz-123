import { Component, OnInit } from '@angular/core';
import {TEAMS} from "../providers/mock-teams";

@Component({
  selector: 'app-teams-and-players',
  templateUrl: './teams-and-players.component.html',
  styleUrls: ['./teams-and-players.component.css']
})
export class TeamsAndPlayersComponent implements OnInit {

  teamsAndPlayerList: any = TEAMS;

  constructor() { }

  ngOnInit() {
  }

}
