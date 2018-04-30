import { Component, OnInit } from '@angular/core';
import {SCHEDULE} from '../providers/mock-schedule';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // schedule list
  schedules: any = SCHEDULE;

  constructor() { }

  ngOnInit() {
  }

}
