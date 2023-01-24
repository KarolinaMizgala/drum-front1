import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';

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
  
  constructor(private _lessonService: LessonService,private formBuilder : FormBuilder, private http: HttpClient, private router:Router, private route:ActivatedRoute ) {}
  ngOnInit(): void {
    this._lessonService.getPosts().subscribe(data => this.lessons = data);
    this.lessonsForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      date: ['']
    })

  }
  goToLesson(id: any){
  this.lesson_ID=id;
this.router.navigate(["lesson/"+this.lesson_ID])
}
}
