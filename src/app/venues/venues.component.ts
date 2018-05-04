import { Component, OnInit } from '@angular/core';
import {VENUES} from "../providers/mock-venue";

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {
  venues: any = VENUES;
  constructor() { }

  ngOnInit() {
  }

}
