import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeriesComponent } from './components/series/series.component';
import { LoginComponent } from './components/login/login.component';
import { OtherSeriesComponent } from './components/other-series/other-series.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { DetailsSerieComponent } from './components/details-serie/details-serie.component';
import { AmisComponent } from './components/amis/amis.component';
import { ProfilComponent } from './components/profil/profil.component';
import { DetailsEpisodeComponent } from './components/details-episode/details-episode.component';

const routes: Routes = [
  { path: 'series', component: SeriesComponent },
  { path: '', component: LoginComponent },
  { path: 'otherSeries', component: OtherSeriesComponent },
  { path: 'episodes/:id', component: EpisodesComponent },
  { path: 'detailsSerie/:id', component: DetailsSerieComponent },
  { path: 'amis', component: AmisComponent },
  { path: 'profil', component: ProfilComponent } ,
  { path: 'detailsEpisode/:id', component: DetailsEpisodeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
