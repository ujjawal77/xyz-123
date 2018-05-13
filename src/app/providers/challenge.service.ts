import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ChallengeService {

  private url = 'http://localhost:5000' + '/api/challenge/';

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers() {
    return this.http.get(this.url + 'users');
  }

  // Post user
  postUser(body) {
    return this.http.post(this.url + 'user', body);
  }

  // Post challenge
  postChallenge(body) {
    return this.http.post(this.url + 'challenge', body);
  }
}
