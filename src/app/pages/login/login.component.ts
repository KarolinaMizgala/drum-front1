import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router:Router) {}

  ngOnInit() :void {
    this.loginForm = this.formBuilder.group(
      {
        email:[''],
        password1:['']
      }
    );
  }
  login() :void {
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password1 === this.loginForm.value.password1;
      });
      if(user)
      {
        alert("login success");
        this.loginForm.reset();
        this.router.navigate(['post-feed'])
      }
      else{
        alert("user not found");
      }
    },err=>{
      alert("nie git")
    })
  }

}
