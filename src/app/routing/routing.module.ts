import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {TeamsAndPlayersComponent} from '../teams-and-players/teams-and-players.component';
import {VenuesComponent} from '../venues/venues.component';

const routes: Routes = [
  {path: '', redirectTo : '/schedule', pathMatch : 'full'},
  {path: 'schedule', component: HomeComponent},
  {path: 'teamsandplayers', component: TeamsAndPlayersComponent},
  {path: 'venues', component: VenuesComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule { }
