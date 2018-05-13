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

  // Get user
  getUser(userId) {
    return this.http.get(this.url + 'user/' + userId);
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
