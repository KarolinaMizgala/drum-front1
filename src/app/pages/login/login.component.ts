import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
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
        email:new FormControl('', [Validators.required]),
        password1:new FormControl('', [Validators.required]),
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
        alert("Logowanie pomyślne");
        this.loginForm.reset();
        this.router.navigate(['post-feed'])
      }
      else{
        alert("Nie istnieje użytkownik o podanych parametrach");
      }
    },err=>{
      alert("Błąd logowania")
    })
  }

}
