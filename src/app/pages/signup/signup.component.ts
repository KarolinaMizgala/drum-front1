import { Component, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Validator } from '@angular/forms';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router, private service: LoginService ) {}

  public signupForm !: FormGroup;
  public repeatPassword !: String
  public btnActive = false

  logged = false

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password1')!.value;
    let confirmPass = group.get('password2')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, 
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
      accType: new FormControl('', [Validators.required]),
    }, { validators: this.checkPasswords })
    this.btnActive = false;
  }

  createUser() :void {
    let data = {"login": this.signupForm.value.username, "password": this.signupForm.value.password1, "type": this.signupForm.value.accType};
    const res = fetch(LoginService.backAddress+"register", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.afterCreateUser(x);
    });
  }
  afterCreateUser(s: JSON) :void{
    if(JSON.stringify(s) === JSON.stringify({"status": "OK"}))
    {
      //rejestracja udana
      this.logged = true
      LoginService.loggedState = this.logged
      this.router.navigate(['login'])
    }
    else
    {
      //błąd rejestracji
    }
  }
  }