import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from '../login/login.component';


interface Lesson {  
  id: Number;  
  title: String;  
  content: String;  
  author: String;  
  date: Date;
  attachment: String;
} 

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent {
  public lessons: any
  public lessonsForm !: FormGroup;
  public lesson_ID =this.route.snapshot.params['lesson_ID'] ;
  public myDate!:Date;

  attachmentNumber = 0

  splitted: string[] = ["lalalala"]
  
  constructor(private _lessonService: LessonService,private formBuilder : FormBuilder, private http: HttpClient, private router:Router, private route:ActivatedRoute, private loginService: LoginService) {}
  ngOnInit(): void {
    //this._lessonService.getPosts().subscribe(data => this.lessons = data);

    this.lessonsForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      date: ['']
    })
    this.getLessons()

    

  }
  getLessons() {
    const res = fetch(LoginService.backAddress+"getLessons", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.lessons = x.data
    });
  }

  func()
  {
    this.attachmentNumber += 1
  }

  split(n: number) : boolean
  {
    this.splitted = this.lessons[n].content.split('b',1)
    return true
  }


}
