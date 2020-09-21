import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {
  form: FormGroup;

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  episodes: any[];
  seasons: any[];
  serie_id: string;
  img_seasons: any[];
  episodes_season: any[];
  season: 1;
  url_img: string;
  episode_id: any[];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private elem: ElementRef
  ) { 
    this.serie_id = this.actRoute.snapshot.params.id;
    this.form = this.fb.group({
      text: [''],
    })
  }

  headers =  new HttpHeaders()
    .set('Content-Type', 'application/json')
    
  params_episodes = new HttpParams()
    .set('key', '10fdb91e0dbc')
    .set('token', sessionStorage.getItem("token"))
    .set('limit', '1000000');

  headers_img =  new HttpHeaders({
    'Content-Type': 'image/jpeg',
    'Access-Control-Allow-Origin': '*'
  })

  params_img = new HttpParams()
  .set('key', '10fdb91e0dbc')

  ngOnInit(): void {
    let token = sessionStorage.getItem("token");
    if (token === null) {
      this.router.navigate(['/']);
    }

    this.params_episodes = this.params_episodes.append('showId', this.serie_id);

    this.http.get('https://api.betaseries.com/episodes/list', {headers: this.headers, params: this.params_episodes}).subscribe(
      (response) => {
      this.episodes = [response["shows"]];
      this.episodes_season = this.episodes[0][0].unseen.filter(item => {
        return item.season === 1;
      })
      console.log(this.episodes_season);
      this.url_img = "https://api.betaseries.com/pictures/seasons?key=10fdb91e0dbc&show_id="+this.serie_id+"&season=1";
    },      
      (error) => console.log(error)
    )
  }
  
  sawEpisode(episode_id) {
    this.http.post('https://api.betaseries.com/episodes/watched?key=10fdb91e0dbc&token='+sessionStorage.getItem("token")+'&id='+episode_id+'&bulk=false', {headers: this.headers}).subscribe(
      (response) => {
      console.log(response);
      location.reload();
    },      
      (error) => console.log(error)
    )
  }

  sawEpisodes(episode_id) {
    this.http.post('https://api.betaseries.com/episodes/watched?key=10fdb91e0dbc&token='+sessionStorage.getItem("token")+'&id='+episode_id+'&bulk=true', {headers: this.headers}).subscribe(
      (response) => {
      console.log(response);
      location.reload();
    },      
      (error) => console.log(error)
    )
  }

  closeModalComment() {
    this.elem.nativeElement.querySelector('.modal-comment').style.display = "none";
  }

  closeModalSuccess() {
    this.elem.nativeElement.querySelector('.modal-success').style.display = "none";
  }

  commentEpisode() {
    this.elem.nativeElement.querySelector('.modal-comment').style.display = "block";
  }

  submitComment(id) {
    let formData: any = new FormData();
    formData.append("text", this.form.get('text').value);

    this.http.post('https://api.betaseries.com/comments/comment?key=10fdb91e0dbc&token='+sessionStorage.getItem("token")+'&type=episode&id='+id, formData).subscribe(
      (response) => {
        console.log(response),
        this.elem.nativeElement.querySelector('.modal-success').style.display = "block"},
      (error) => console.log(error)
    )
  }
}
