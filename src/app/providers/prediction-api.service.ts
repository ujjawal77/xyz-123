import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PredictionApiService {

  private url = 'http://localhost:5000' + '/api/voting/';

  constructor(private http: HttpClient) {

  }

  // Get voting count of a particular match
  getAllPrediction() {
    return this.http.get(this.url);
  }

  // Get voting count of a particular match
  getPrediction(matchName) {
    return this.http.get(this.url + matchName);
  }

  // Post a voting of a particular match
  postPrediction(body) {
    return this.http.post(this.url, body);
  }
}
