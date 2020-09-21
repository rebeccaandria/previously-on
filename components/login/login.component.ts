import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import {Md5} from 'ts-md5/dist/md5';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
      public fb: FormBuilder,
      private router: Router,
      private http: HttpClient
    ) {
      this.form = this.fb.group({
        login: [''],
        password: [''],
        key: ['10fdb91e0dbc']
      })
    }

  ngOnInit() { }

  submitForm() {
    let formData: any = new FormData();
    let password = this.form.get('password').value;
    formData.append("login", this.form.get('login').value);
    formData.append("password", Md5.hashStr(password));
    formData.append("key", this.form.get('key').value);

    this.http.post('https://api.betaseries.com/members/auth', formData).subscribe(
      (response) => {
        console.log(response),
        sessionStorage.setItem("token", response['token']),
        sessionStorage.setItem("id", response["user"]["id"]),
        this.router.navigate(['/series'])},
      (error) => console.log(error)
    )
  }
}
