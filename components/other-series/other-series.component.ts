import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { AlertService } from '../../_alert';

@Component({
  selector: 'app-other-series',
  templateUrl: './other-series.component.html',
  styleUrls: ['./other-series.component.css']
})
export class OtherSeriesComponent implements OnInit {
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  otherSeries : Object[];

  constructor(
    private router: Router,
    private http: HttpClient,
    public alertService: AlertService,
    private elem: ElementRef
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams()
      .set('key', '10fdb91e0dbc')
      .set('filter', 'new')
      .set('limit', '51')
      .set('order', 'popularity')
  }

  ngOnInit(): void {
    let token = sessionStorage.getItem("token");
    if (token === null) {
      this.router.navigate(['/']);
    }

    this.http.get('https://api.betaseries.com/shows/list', this.httpOptions).subscribe(
      (response) => { this.otherSeries = response["shows"], console.log(response) },      
      (error) => console.log(error)
    )
  }

  closeModal() {
    this.elem.nativeElement.querySelector('.modal-success').style.display = "none";
  }

  addSerie(serieId: number) {
    let data: any = new FormData();
    data.append("key", '10fdb91e0dbc');
    data.append("id", serieId);
    data.append("token", sessionStorage.getItem("token"));

    this.http.post('https://api.betaseries.com/shows/show', data).subscribe(
      (response) => {console.log(response),
        this.elem.nativeElement.querySelector('.modal-success').style.display = "block";
      },
      (error) => {console.log(error),
        this.alertService.error('Erreur ! ', this.options)
      }
    )
  }
}