import { Component, OnInit } from '@angular/core';
import {SCHEDULE} from '../providers/mock-schedule';
import {TEAMS} from '../providers/mock-teams';
import {VENUES} from '../providers/mock-venue';
import {PredictionApiService} from "../providers/prediction-api.service";
import {NavigationEnd, Router} from "@angular/router";

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
  teamVoted: String = 'team1';
  canVote = true;
  votingResultAvailable = false;
  userVotedList: any = [];
  isVotingDone: boolean = true;

  constructor(private predictionApiService: PredictionApiService, private route: Router) {
    this.route.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.route.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.route.navigated = false;
      }
    });

    this.userVotedList = JSON.parse(localStorage.getItem('hasVotedFor'));
    this.fixtureList = this.schedules;
    this.filteredFixtureList = this.schedules;
    this.selectedTeam = this.teams[0];
    this.selectedVenue = this.venues[0];
  }

  ngOnInit() {
    this.predictionApiService.getAllPrediction().subscribe((result: any) => {
      result.forEach((matchPrediction, index) => {
        if (matchPrediction.name === this.fixtureList[index].name) {
          this.fixtureList[index].team1Votes = matchPrediction.team1;
          this.fixtureList[index].team2Votes = matchPrediction.team2;
          this.fixtureList[index].totalVotes = matchPrediction.team1 + matchPrediction.team2;
          let team1percent = Math.floor((matchPrediction.team1 / this.fixtureList[index].totalVotes) * 100);
          let team2percent = Math.floor((matchPrediction.team2 / this.fixtureList[index].totalVotes) * 100);
          this.fixtureList[index].team1progessValue = team1percent;
          this.fixtureList[index].team2progessValue = team2percent;
          this.fixtureList[index].team1percent = team1percent + '%';
          this.fixtureList[index].team2percent = team2percent + '%';
          let countDownDate = new Date(this.fixtureList[index].countDown).getTime();
          let x = setInterval(() => {

            // Get todays date and time
            let now = new Date().getTime();

            // Find the distance between now an the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.fixtureList[index].days = days;
            this.fixtureList[index].hours = hours;
            this.fixtureList[index].minutes = minutes;
            this.fixtureList[index].seconds = seconds;
            // Don't allow voting once the match is completed
            if (distance < 0) {
              this.canVote = false;
            }
          }, 1000);
        }
      });
      this.votingResultAvailable = true;
    }, (error) => {
      console.log('error', error);
    });
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

  vote(fixture) {
    this.isVotingDone = false;
    let userVotingList = JSON.parse(localStorage.getItem('hasVotedFor'));
    userVotingList.push(fixture.name);
    localStorage.setItem('hasVotedFor', JSON.stringify(userVotingList));
    let voteObj = {
      'team' : this.teamVoted,
      'match' : fixture.name
    };
    this.predictionApiService.postPrediction(voteObj).subscribe((result) => {
      this.isVotingDone = true;
      this.userVotedList = JSON.parse(localStorage.getItem('hasVotedFor'));
    }, (error) => {
      console.log(error);
    });
  }
}
