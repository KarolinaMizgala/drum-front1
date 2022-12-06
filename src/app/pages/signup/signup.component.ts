import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value).
      subscribe(res => {
        alert("Konto założone");
        this.signupForm.reset();
        this.router.navigate(['login']);
      }, err => {alert("Nie udało się zakłożyć konta") })
  }

}
