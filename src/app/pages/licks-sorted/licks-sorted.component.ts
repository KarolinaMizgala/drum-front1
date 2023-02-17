import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-licks-sorted',
  templateUrl: './licks-sorted.component.html',
  styleUrls: ['./licks-sorted.component.css']
})
export class LicksSortedComponent {
  public licks: any;
  public licksForm !: FormGroup;
  public lick_ID: any ;
  public licks_category =this.route.snapshot.params['licks_category'] ;
  public myDate!:Date;
  
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router, private route:ActivatedRoute, private loginService:LoginService ) {}
  ngOnInit(): void {
    this.licksForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      date: ['']
    })
    this.getLicks()
  }
  goToLick(id: any){
  this.lick_ID=id;
this.router.navigate(["lick/"+this.lick_ID])
}

getLicks() {
  const res = fetch(LoginService.backAddress+"getLicks", {method: "GET", credentials: 'include'});
  res.then(response => { return response.json(); }).then(x => {
    this.licks = x.data
  });
}

}
