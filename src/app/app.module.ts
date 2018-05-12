import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialcomponentsModule} from './materialcomponents/materialcomponents.module';
import {RoutingModule} from './routing/routing.module';
import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from "angular5-social-login";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TeamsAndPlayersComponent } from './teams-and-players/teams-and-players.component';
import { VenuesComponent } from './venues/venues.component';
import {PredictionApiService} from "./providers/prediction-api.service";
import { SigninComponent } from './signin/signin.component';


// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('800738711325-ejuf29r00d5nsmesiabbatt9s7pidl7e.apps.googleusercontent.com')
      }
    ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeamsAndPlayersComponent,
    VenuesComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialcomponentsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    RoutingModule,
    SocialLoginModule
  ],
  providers: [
    PredictionApiService,
    {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
