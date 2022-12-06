import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router ) {}

  public signupForm !: FormGroup;
  public repeatPassword !: String

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      login: [''],
      email: [''],
      password: [''],
      accType: ['']
    })
   
  }

  createUser() {


    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value).
      subscribe(res => {
        alert("git");
        this.signupForm.reset();
        this.router.navigate(['login']);
      }, err => {alert("nie git") })
  }

}
