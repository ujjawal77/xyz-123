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
  profile: any;
  users: any;
  challenges: any;

  constructor(private challengeService: ChallengeService) { }

  ngOnInit() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    this.challengeService.getUser(profile.id).subscribe((result: any) => {
      this.profile = result;
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
    this.challengeService.postChallenge(challengeData).subscribe((result) => {
    }, (err) => {
      console.error(err);
    });
  }
}
