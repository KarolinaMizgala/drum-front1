import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-lick',
  templateUrl: './lick.component.html',
  styleUrls: ['./lick.component.css']
})
export class LickComponent {
  public licks: any;
  public licksForm !: FormGroup;
  public lick_ID =this.route.snapshot.params['lick_ID'] ;
  public myDate!:Date;
  
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router, private route:ActivatedRoute ) {}
  ngOnInit(): void {
    //this._lessonService.getPosts().subscribe(data => this.lessons = data);

    this.licksForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      date: ['']
    })
    this.getLicks()
  }
  getLicks() {
    const res = fetch("http://localhost:25565/getLicks", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.licks = x.data
    });
  }


}
