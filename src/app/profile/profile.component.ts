import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../providers/challenge.service';
import {SCHEDULE} from "../providers/mock-schedule";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  schedules: any = SCHEDULE;
  profile: any;
  users: any;

  constructor(private challengeService: ChallengeService) { }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.challengeService.getUsers().subscribe((result: any) => {
      this.users = result;
      console.log(result);
    });
  }

}
