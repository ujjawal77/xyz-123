import { Component, OnInit } from '@angular/core';
import {SCHEDULE} from '../providers/mock-schedule';
import {TEAMS} from "../providers/mock-teams";
import {VENUES} from "../providers/mock-venue";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // schedule list
  schedules: any = SCHEDULE;
  teams: any = TEAMS;
  venues: any = VENUES;
  selectedVenue: any = {};
  selectedTeam: any = {};
  fixtureList: Array<any> = [];
  filteredFixtureList: any = [];

  constructor() {
    this.fixtureList = this.schedules;
    this.filteredFixtureList = this.schedules;
    this.selectedTeam = this.teams[0];
    this.selectedVenue = this.venues[0];
  }

  ngOnInit() {
  }

  onTeamSelect() {
    if (this.selectedTeam.name !== 'All Teams') {
      if (this.selectedVenue.name !== 'All Venues') {
        if (this.filteredFixtureList.length) {
          this.filteredFixtureList = this.filteredFixtureList.filter(
            fixture => fixture.team1 === this.selectedTeam.name || fixture.team2 === this.selectedTeam.name
          );
        } else {
          this.filteredFixtureList = this.fixtureList.filter(
            fixture => (fixture.team1 === this.selectedTeam.name || fixture.team2 === this.selectedTeam.name) &&
              (fixture.city === this.selectedVenue.name)
          );
        }
      } else {
        if (this.filteredFixtureList.length) {
          this.filteredFixtureList = this.fixtureList.filter(
            fixture => fixture.team1 === this.selectedTeam.name || fixture.team2 === this.selectedTeam.name
          );
        } else {
          this.filteredFixtureList = this.fixtureList.filter(
            fixture => (fixture.team1 === this.selectedTeam.name || fixture.team2 === this.selectedTeam.name) &&
              (fixture.city === this.selectedVenue.name)
          );
        }
      }
    } else {
      if (this.selectedVenue.name !== 'All Venues'){
        this.filteredFixtureList = this.fixtureList.filter(
          fixture => fixture.city === this.selectedVenue.name
        );
      } else {
        this.filteredFixtureList = this.fixtureList;
      }
    }
  }
  onVenueSelect() {
    if (this.selectedVenue.name !== 'All Venues') {
      if (this.selectedTeam.name !== 'All Teams') {
        if (this.filteredFixtureList.length) {
          this.filteredFixtureList = this.filteredFixtureList.filter(
            fixture => fixture.city === this.selectedVenue.name
          );
        } else {
          this.filteredFixtureList = this.fixtureList.filter(
            fixture => (fixture.team1 === this.selectedTeam.name || fixture.team2 === this.selectedTeam.name)
              && (fixture.city === this.selectedVenue.name)
          );
        }
      } else {
        if (this.filteredFixtureList.length) {
          this.filteredFixtureList = this.fixtureList.filter(
            fixture => fixture.city === this.selectedVenue.name
          );
        } else {
          this.filteredFixtureList = this.fixtureList.filter(
            fixture => (fixture.team1 === this.selectedTeam.name || fixture.team2 === this.selectedTeam.name)
              && (fixture.city === this.selectedVenue.name)
          );
        }
      }
    } else {
      if (this.selectedTeam.name !== 'All Teams') {
        this.filteredFixtureList = this.fixtureList.filter(
          fixture => fixture.team1 === this.selectedTeam.name || fixture.team2 === this.selectedTeam.name
        );
      } else {
        this.filteredFixtureList = this.fixtureList;
      }
    }
  }

  width = 600;
  height = 400;
  type = 'pie3d';
  dataFormat = 'json';
  dataSource = {
    "chart": {
      "caption": "Age profile of website visitors",
      "subcaption": "Last Year",
      "startingangle": "120",
      "showlabels": "0",
      "showlegend": "1",
      "enablemultislicing": "0",
      "slicingdistance": "15",
      "showpercentvalues": "1",
      "showpercentintooltip": "0",
      "plottooltext": "Age group : $label Total visit : $datavalue",
      "theme": "ocean"
    },
    "data": [
      {
        "label": "Teenage",
        "value": "1250400"
      },
      {
        "label": "Adult",
        "value": "1463300"
      },
      {
        "label": "Mid-age",
        "value": "1050700"
      },
      {
        "label": "Senior",
        "value": "491000"
      }
    ]
  };

}
