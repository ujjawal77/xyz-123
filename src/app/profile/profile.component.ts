import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../providers/challenge.service';
import {SCHEDULE} from '../providers/mock-schedule';

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
      console.log('challenges: ', result);
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
