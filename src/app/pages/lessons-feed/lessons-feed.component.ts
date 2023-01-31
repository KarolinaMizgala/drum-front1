import { AfterViewInit, Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-lessons',
  templateUrl: './lessons-feed.component.html',
  styleUrls: ['./lessons-feed.component.css']
})
export class LessonsFeedComponent  {
  
  logged = false

  public lessons: any;
  public lessonsForm !: FormGroup;
  private lesson_ID: any;
  private lessons_category: string | undefined;
  public myDate!:Date;
  
  constructor(private _lessonService: LessonService,private formBuilder : FormBuilder, private http: HttpClient, private router:Router, private service: LoginService) {}
  ngOnInit(): void {
    this.logged = this.service.loggedState
    this._lessonService.getPosts().subscribe(data => this.lessons = data);
    this.lessonsForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      date: ['']
    })
   
  }

  createLessons() {

    this.myDate = new Date();
    this.lessonsForm.value.date = this.myDate;


    
    this.http.post<any>("http://localhost:3000/posts", this.lessonsForm.value).
      subscribe(res => {
        alert("Post dodany");
        this._lessonService.getPosts().subscribe(data => this.lessons = data);
        this.lessonsForm.reset();
      }, err => {alert("Nie udało się dodać posta") })
  }
goToLesson(id: any){
  this.lesson_ID=id;
this.router.navigate(["lesson/"+this.lesson_ID])
}
goToCategory(id: any){
  this.lessons_category=id;
this.router.navigate(["lessons-sorted/"+this.lessons_category])
}

}

