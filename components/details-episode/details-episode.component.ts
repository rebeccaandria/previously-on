import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-episode',
  templateUrl: './details-episode.component.html',
  styleUrls: ['./details-episode.component.css']
})
export class DetailsEpisodeComponent implements OnInit {
  episodes : any[];
  diffusion : any[];
  episode_id: string;
  note: number;


  constructor(
    private router: Router,
    private http: HttpClient,
    private actRoute: ActivatedRoute
  ) {
    this.episode_id = this.actRoute.snapshot.params.id;
   }

   headers =  new HttpHeaders().set('Content-Type', 'application/json');
   params = new HttpParams().set('key', '10fdb91e0dbc');

  ngOnInit(): void {
    let token = sessionStorage.getItem("token");
    if (token === null) {
      this.router.navigate(['/']);
    }
    
    this.params = this.params.append('id', this.episode_id);
     
    this.http.get('https://api.betaseries.com/episodes/display', {headers: this.headers, params: this.params}).subscribe(
      (response) => {
      this.episodes= [response['episode']];
      //console.log(this.episodes[0]);
     // this.episodes = Object.keys(this.episodes).map(key => ({ key, value: this.episodes[key]}));
  //console.log('titl',this.episodes);

     // this.diffusion = response["episodes"];
      //this.note = Math.round(response["episodes"].notes["mean"] * 10) / 10;
    },      
      (error) => console.log(error)
    )
  }

}
