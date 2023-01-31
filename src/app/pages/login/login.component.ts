import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  

  

  public loginForm!: FormGroup
  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder, private http: HttpClient, private router:Router) {}

  ngOnInit() :void {
    this.loginForm = this.formBuilder.group(
      {
        login:new FormControl('', [Validators.required]),
        password1:new FormControl('', [Validators.required]),
      }
    );
  }
  login() :void {
    let data = {"login": this.loginForm.value.login, "password": this.loginForm.value.password1};
    const res = fetch("http://localhost:25565/login", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      console.log( JSON.stringify(x));
    });
  }

}