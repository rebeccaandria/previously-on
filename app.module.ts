import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StarRatingModule } from 'angular-star-rating';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeriesComponent } from './components/series/series.component';
import { LoginComponent } from './components/login/login.component';
import { OtherSeriesComponent } from './components/other-series/other-series.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { DetailsSerieComponent } from './components/details-serie/details-serie.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AmisComponent } from './components/amis/amis.component';
import { ProfilComponent } from './components/profil/profil.component';
import { DetailsEpisodeComponent } from './components/details-episode/details-episode.component';



@NgModule({
  declarations: [
    AppComponent,
    SeriesComponent,
    LoginComponent,
    OtherSeriesComponent,
    EpisodesComponent,
    DetailsSerieComponent,
    AmisComponent,
    ProfilComponent,
    DetailsEpisodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StarRatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
