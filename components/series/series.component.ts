import { Component, OnInit, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { AlertService } from '../../_alert';


@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  options = {
    autoClose: false,
    keepAfterRouteChange: true
  };

  series : object[];

  constructor(
    private router: Router,
    private http: HttpClient,
    public alertService: AlertService,
    private elem: ElementRef,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams()
      .set('id', sessionStorage.getItem("id"))
      .set('key', '10fdb91e0dbc')
  }

  ngOnInit(): void {
    let token = sessionStorage.getItem("token");
    if (token === null) {
      this.router.navigate(['/']);
    }

    console.log(this.httpOptions);
    this.http.get('https://api.betaseries.com/shows/member', this.httpOptions).subscribe(
      (response) => { this.series = response["shows"], console.log(response) },      
      (error) => console.log(error)
    )
  }

  closeModal() {
    this.elem.nativeElement.querySelector('.modal-success').style.display = "none";
  }

  archiveSerie(serieId: number) {
    let data: any = new FormData();
    data.append("key", '10fdb91e0dbc');
    data.append("id", serieId);
    data.append("token", sessionStorage.getItem("token"));

    this.http.post('https://api.betaseries.com/shows/archive', data).subscribe(
      (response) => {console.log(response),
        this.elem.nativeElement.querySelector('.modal-success').style.display = "block";
        this.elem.nativeElement.querySelector('.card-img-top').style.opacity = " 0.2";
        this.elem.nativeElement.querySelector('.card-text').innerHTML = "Archivée";
        this.elem.nativeElement.querySelector('.card-text').style.color = "white";
        this.elem.nativeElement.querySelector('.card-text').style.fontSize = "20px";
      },
      (error) => {console.log(error),
        this.alertService.error('Erreur ! ')
      }
    )
  }
    deleteSerie(serieId: number) {
      this.http.delete('https://api.betaseries.com/shows/show?key=10fdb91e0dbc&token='+sessionStorage.getItem("token")+'&id='+serieId).subscribe(
        (response) => {console.log(response),
          location.reload();
          this.elem.nativeElement.querySelector('.modal-success').style.display = "block";
        },
        (error) => {console.log(error),
          this.alertService.error('Erreur ! ', this.options)
        }
      )

}
}