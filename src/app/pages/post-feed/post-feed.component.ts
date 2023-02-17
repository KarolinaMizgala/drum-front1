import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


interface Post {  
  id: Number;  
  title: String;  
  content: String;  
  author: String;  
  date: Date;
  attachment: String;
}  
 
@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit{

  logged = false
  username = ""
  usertype = "guest"
  empty = ""

  public posts!: Post[];
  public postForm !: FormGroup;

  public myDate!: Date;

  constructor(private _postService: PostService, private formBuilder : FormBuilder, private router:Router, private http: HttpClient, private service:LoginService) {}


  ngOnInit(): void {
    this.logged = this.service.loggedState
    this.getPosts();
    if(this.logged)
    {
      this.getUserName()
      this.getUserType()
    }
    this.postForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      attachment:  [''],
      visible: new FormControl('', [Validators.required]),
      date: ['']
    })

    

  }
    getUserType() :void{
      const res = fetch(LoginService.backAddress+"getUserType", {method: "GET", credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.usertype = x.userType
      });

    }


    deletePost(id: Number) :void {
      let data = {"id": id};
      const res = fetch(LoginService.backAddress+"deletePost", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.afterDeletePost(x);
      });
    }
    afterDeletePost(s: JSON) :void{
      if(JSON.stringify(s) === JSON.stringify({"status": "OK"}))
      {
        //usuniecie posta udane
        this.getPosts()
      }
    }

  getUserName() {
    const res = fetch(LoginService.backAddress+"getUserName", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.username = x.userName
    });
  }

  getPosts() :void {
    this.http.get<any>(LoginService.backAddress+"getPosts").subscribe(response=>{
      console.log(response);
      this.posts = response.data;
    })
    };




  createPost() :void {
    let data = {"title": this.postForm.value.title, "content": this.postForm.value.text, "visible": "1", "image":this.postForm.value.attachment};
    const res = fetch(LoginService.backAddress+"setPost", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.afterCreatePost(x);
    });
  }

  afterCreatePost(s: JSON) :void{
    if(JSON.stringify(s) === JSON.stringify({"status": "OK"}))
    {
      this.getPosts()
      //dodanie posta udane

    }
    else
    {
      //błąd przy dodawaniu posta
    }
  }


}

