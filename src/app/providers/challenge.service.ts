import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ChallengeService {

  private url = 'http://localhost:5000' + '/api/challenge/';

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers() {
    return this.http.get(this.url);
  }

  // Save a user
  postUser(body) {
    return this.http.post(this.url, body);
  }
}
