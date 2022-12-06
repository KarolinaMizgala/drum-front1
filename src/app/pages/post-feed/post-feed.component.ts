import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit{

  public posts : any;
  public postForm !: FormGroup;

  public myDate!: Date;

  constructor(private _postService: PostService, private formBuilder : FormBuilder, private http: HttpClient ) {}


  ngOnInit(): void {
    this._postService.getPosts().subscribe(data => this.posts = data);
    this.postForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      date: ['']
    })
   
  }

  createPost() {

    this.myDate = new Date();
    this.postForm.value.date = this.myDate;


    this.http.post<any>("http://localhost:3000/posts", this.postForm.value).
      subscribe(res => {
        alert("Post dodany");
        this._postService.getPosts().subscribe(data => this.posts = data);
        this.postForm.reset();
      }, err => {alert("Nie udało się dodać posta") })
  }
  
}

