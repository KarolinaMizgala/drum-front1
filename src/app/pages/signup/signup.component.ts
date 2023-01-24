import { Component, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Validator } from '@angular/forms';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router ) {}

  public signupForm !: FormGroup;
  public repeatPassword !: String
  public btnActive = false

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

  createUser() {

    var request = new XMLHttpRequest();
    request.open("POST", 'http://91.222.75.23:25565/sign-up');
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    request.send("username="+this.signupForm.value.username+"&password1="+this.signupForm.value.password1+"&password2="+this.signupForm.value.password2+"&email="+this.signupForm.value.email+"&accType="+this.signupForm.value.accType);


    // const headers = new HttpHeaders({
    //   'disable-cors': '',
    //   'host': 'http://91.222.75.23:25565'
    // });
    
    // const formData = {
    //   username: this.signupForm.value.username,
    //   password1: this.signupForm.value.password1,
    //   password2: this.signupForm.value.password2,
    //   email: this.signupForm.value.email,
    //   accType: this.signupForm.value.accType
    // };

    // const options = {
    //   headers: headers,
    //   body: formData
    // };

    
    
    // this.http.post('http://91.222.75.23:25565/sign-up', options)
    //   .subscribe((response) => {
    //     alert("Konto założone");
    //     this.signupForm.reset();
    //     this.router.navigate(['login']);
    //   },err => {alert("Nie udało się zakłożyć konta") })

   //this.http.post<any>("http://91.222.75.23:25565/sign-up", this.signupForm.value).
  //     subscribe(res => {
  //       alert("Konto założone");
  //       this.signupForm.reset();
  //       this.router.navigate(['login']);
  //     }, err => {alert("Nie udało się zakłożyć konta") })
  // }
  }
}
