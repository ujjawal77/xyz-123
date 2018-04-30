import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialcomponentsModule} from './materialcomponents/materialcomponents.module';
import {RoutingModule} from './routing/routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TeamsAndPlayersComponent } from './teams-and-players/teams-and-players.component';
import { VenuesComponent } from './venues/venues.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeamsAndPlayersComponent,
    VenuesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialcomponentsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
