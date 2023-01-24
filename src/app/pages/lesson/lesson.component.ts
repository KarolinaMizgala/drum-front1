import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent {
  public lessons: any;
  public lessonsForm !: FormGroup;
  public lesson_ID =this.route.snapshot.params['lesson_ID'] ;
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


}
