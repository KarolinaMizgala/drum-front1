import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common'
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logged = false
  

  public loginForm!: FormGroup
  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder, private http: HttpClient, private router:Router, private service: LoginService) {
    
  }

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
    const res = fetch(LoginService.backAddress+"login", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.afterLogin(x);
    });
  }
  afterLogin(s: JSON) :void{
    if(JSON.stringify(s) === JSON.stringify({"status": "OK"}))
    {
      //logowanie udane
      this.logged = true
      this.service.loggedState = this.logged
      this.router.navigate(['post-feed'])
    }
    if(JSON.stringify(s) === JSON.stringify({"status": "User not found"}))
    {
      //błąd logowania
      this.logged = false
    }
  }
  }
  