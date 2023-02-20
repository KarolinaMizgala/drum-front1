import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  public changePasswordForm!: FormGroup

  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router, private service: LoginService ) {}

  public accountInfoForm !: FormGroup;

  public repeatPassword !: String
  public btnActive = false

  logged = false

  username = "admin"
  email = "klaudiuszmekarski@gmail.com"
  usertype = "admin"

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword:new FormControl('', [Validators.required]),
        newPassword:new FormControl('', [Validators.required]),
      }
    );
    this.getUserName()
    this.getUserType()

    if(!LoginService.loggedState)
    this.router.navigate(["/login"])
  }


  changePassword() :void {
    let data = {"password": this.changePasswordForm.value.oldPassword, "newPassword": this.changePasswordForm.value.newPassword};
    const res = fetch(LoginService.backAddress+"changePassword", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.afterChangePassword(x);
    });
  }
  afterChangePassword(s: JSON) :void{
    if(JSON.stringify(s) === JSON.stringify({"status": "OK"}))
    {
      //zmiana hasła udana
    }
    else
    {
      //błąd zmiany hasła
    }
  }
  getUserName() {
    const res = fetch(LoginService.backAddress+"getUserName", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      document.getElementById("getUserNameOutput")!.innerHTML = x.userName
      this.username = x.userName
    });
  }
  getUserType() :void{
    const res = fetch(LoginService.backAddress+"getUserType", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.usertype = x.userType
    });

  }
}
