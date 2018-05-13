import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular5-social-login';
import {Router} from '@angular/router';
import { ChallengeService} from "./providers/challenge.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private socialAuthService: AuthService, private router: Router, private challengeService: ChallengeService) {
    if (localStorage.getItem('hasVotedFor') == null) {
      localStorage.setItem('hasVotedFor', JSON.stringify([]));
    }
  }

  public socialSignIn() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
        localStorage.setItem('profile', JSON.stringify(userData));
        this.router.navigate(['/profile']);
        this.challengeService.postUser(userData).subscribe((result) => {
        }, (error) => {
          console.log(error);
        });
      }
    ).catch((err) => {
      console.log('Error in signin: ', err);
    });
  }
}
