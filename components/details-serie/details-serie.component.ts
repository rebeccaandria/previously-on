import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-serie',
  templateUrl: './details-serie.component.html',
  styleUrls: ['./details-serie.component.css']
})
export class DetailsSerieComponent implements OnInit {
  series : any[];
  genre : Object;
  genres : any[];
  serie_id: string;
  note: number;

  constructor(
    private router: Router,
    private http: HttpClient,
    private actRoute: ActivatedRoute
  ) { 
    this.serie_id = this.actRoute.snapshot.params.id;
  }


  headers =  new HttpHeaders().set('Content-Type', 'application/json');
  params = new HttpParams().set('key', '10fdb91e0dbc');


  ngOnInit(): void {
    let token = sessionStorage.getItem("token");
    if (token === null) {
      this.router.navigate(['/']);
    }
    
    this.params = this.params.append('id', this.serie_id);
    
    this.http.get('https://api.betaseries.com/shows/display', {headers: this.headers, params: this.params}).subscribe(
      (response) => {
      this.series = [response["show"]];
      this.genre = response["show"].genres;
      this.genres = Object.values(this.genre);
      this.note = Math.round(response["show"].notes["mean"] * 10) / 10;
    },      
      (error) => console.log(error)
    )
  }
}
