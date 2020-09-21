import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-amis',
  templateUrl: './amis.component.html',
  styleUrls: ['./amis.component.css']
})

export class AmisComponent implements OnInit {
  amis : object[];

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
        .set('token', sessionStorage.getItem("token"))
        .set('key', '10fdb91e0dbc')
    }

  ngOnInit(): void {
    let token = sessionStorage.getItem("token");
    if (token === null) {
      this.router.navigate(['/']);
  }

  console.log(this.httpOptions);
  this.http.get('https://api.betaseries.com/friends/list', this.httpOptions).subscribe(
    (response) => { this.amis = response["users"], console.log(response) },      
    (error) => console.log(error)
  )

  console.log(this.httpOptions);
  this.http.get('https://api.betaseries.com/friends/block', this.httpOptions).subscribe(
    (response) => { this.amis = response["users"], console.log(response) },      
    (error) => console.log(error)
  )

  
}

}
