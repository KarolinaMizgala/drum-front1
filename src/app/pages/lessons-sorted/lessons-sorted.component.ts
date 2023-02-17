import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-lessons-sorted',
  templateUrl: './lessons-sorted.component.html',
  styleUrls: ['./lessons-sorted.component.css']
})
export class LessonsSortedComponent {
  public lessons: any;
  public lessonsForm !: FormGroup;
  public lesson_ID: any ;
  public lessons_category =this.route.snapshot.params['lessons_category'] ;
  public myDate!:Date;
  
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router, private route:ActivatedRoute, private loginService:LoginService ) {}
  ngOnInit(): void {
    this.lessonsForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      date: ['']
    })
    this.getLessons()
  }
  goToLesson(id: any){
  this.lesson_ID=id;
this.router.navigate(["lesson/"+this.lesson_ID])
}

getLessons() {
  const res = fetch(LoginService.backAddress+"getLessons", {method: "GET", credentials: 'include'});
  res.then(response => { return response.json(); }).then(x => {
    this.lessons = x.data
  });
}

}
