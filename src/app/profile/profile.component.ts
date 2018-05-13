import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../providers/challenge.service';
import {SCHEDULE} from '../providers/mock-schedule';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  schedules: any = SCHEDULE;
  profile: any = {};
  users: any = [];
  challenges: any = [];
  scores: any = [];
  challengeLoader = false;
  hasVoted = false;

  constructor(private challengeService: ChallengeService) { }

  ngOnInit() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    this.challengeService.getUser(profile.id).subscribe((result: any) => {
      this.profile = result;
      _.each(this.profile.challengedUsers, (challengedUser) => {
        let score = {
          challengedUser: {},
          matchesWon: 0,
          matchesLost: 0,
          matchesTied: 0,
          matchesPlayed: 0,
          challenges: []
        };
        let matchesWon = 0;
        let matchesLost = 0;
        let matchesTied = 0;
        let matchesPlayed = 0;
        this.challengeService.getUser(challengedUser).subscribe((user: any) => {
          score.challengedUser = user;
          this.challengeService.getChallengesForUser(challengedUser).subscribe((resp: any) => {
            const challenges = resp;
            _.each(challenges, (challenge) => {
              if (this.profile.userId === challenge.userFrom.userId || this.profile.userId === challenge.userTo.userId) {
                score.challenges.push(challenge);
                matchesPlayed += 1;
                if (challenge.isTied) {
                  matchesTied += 1;
                } else if (challenge.winningUserId === this.profile.userId) {
                  matchesWon += 1;
                } else if (challenge.winningUserId === challengedUser) {
                  matchesLost += 1;
                }
              }
            });
            score.matchesWon = matchesWon;
            score.matchesLost = matchesLost;
            score.matchesTied = matchesTied;
            score.matchesPlayed = matchesPlayed;
            this.scores.push(score);
          });
        });
      });
      console.log(this.scores);
    }, (err) => {
      console.error(err);
    });
    this.challengeService.getUsers().subscribe((result: any) => {
      this.users = result;
    }, (err) => {
      console.error(err);
    });
    this.challengeService.getChallengesForUser(profile.id).subscribe((result: any) => {
      this.challenges = result;
      // Logic to update challenges won/lost
      _.each(this.challenges, (challenge) => {
        if (challenge.userFrom.votedTeam && challenge.userTo.votedTeam && !challenge.winningUserId && !challenge.isTie) {
          _.each(this.schedules, (schedule) => {
            if (schedule.winningTeam && challenge.match.id === schedule.id) {
              let isTie = false;
              let winningUserId;
              if (schedule.winningTeam === challenge.userFrom.votedTeam && schedule.winningTeam === challenge.userTo.votedTeam) {
                isTie = true;
              } else if (schedule.winningTeam === challenge.userFrom.votedTeam) {
                winningUserId = challenge.userFrom.userId;
              } else if (schedule.winningTeam === challenge.userTo.votedTeam) {
                winningUserId = challenge.userTo.userId;
              }
              const body = {
                challengeId: challenge._id,
                winningUserId: winningUserId,
                isTie: isTie
              };
              this.challengeService.updateChallenge(body).subscribe((resp: any) => {
                console.log(resp);
              }, (err) => {
                console.error(err);
              });
            }
          });
        }
      });
    }, (err) => {
      console.error(err);
    });
  }

  public challenge(challengeData) {
    this.challengeLoader = true;
    this.challengeService.postChallenge(challengeData).subscribe((result) => {
      this.challengeLoader = false;
    }, (err) => {
      console.error(err);
    });
  }

  public voteInChallenge(voteData) {
    this.hasVoted = true;
    this.challengeService.updateChallengeVote(voteData).subscribe((result) => {
      console.log(result);
      this.hasVoted = false;
    }, (err) => {
      console.error(err);
    });
  }
}
