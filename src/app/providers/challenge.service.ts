import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ChallengeService {

  private url = 'http://localhost:5000' + '/api/challenge/';

  constructor(private http: HttpClient) { }

  // Get users
  getUsers() {
    return this.http.get(this.url + 'users');
  }

  // Get challenges for user
  getChallengesForUser(userId) {
    return this.http.get(this.url + 'challenges/' + userId);
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

  // Update challenge
  updateChallenge(body) {
    return this.http.put(this.url + 'challenge', body);
  }

  // Update challenge voted team
  updateChallengeVote(body) {
    return this.http.put(this.url + 'vote', body);
  }
}
