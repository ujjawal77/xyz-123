import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular5-social-login';
import {Router} from '@angular/router';
import { ChallengeService } from '../providers/challenge.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private socialAuthService: AuthService, private router: Router, private challengeService: ChallengeService) { }

  ngOnInit() {
  }

  public socialSignIn() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
      console.log('sign in data : ' , userData);
      localStorage.setItem('profile', JSON.stringify(userData));
      this.router.navigate(['/schedule']);
      this.challengeService.postUser(userData).subscribe((result) => {
        console.log('saved user: ', result);
      }, (error) => {
        console.log(error);
      });
      }
    ).catch((err) => {
      console.log('Error in signin: ', err);
    });
  }
}
