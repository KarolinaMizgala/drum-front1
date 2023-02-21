import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

interface Post {  
  id: Number;  
  title: String;  
  content: String;  
  author: String;  
  date: number;
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
  slideIndex = 0;

  inputFile: any
  infoArea: any

  base64 = ""
  backAddress = ""

  myFilename = ""

  public posts!: Post[];
  public postForm !: FormGroup;

  public myDate!: Date;

  constructor(private _postService: PostService, private formBuilder : FormBuilder, private router:Router, private http: HttpClient, private service:LoginService, public sanitizer: DomSanitizer) {}

  ngOnInit(): void {


    this.myDate = new Date(1676847813000)
    this.backAddress = LoginService.backAddress
    this.logged = LoginService.loggedState
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

    
    var input1 = document.getElementById("Png1") as HTMLInputElement
    var input2 = document.getElementById("Png2") as HTMLInputElement
    var input3 = document.getElementById("Png3") as HTMLInputElement
    var input4 = document.getElementById("Png4") as HTMLInputElement
    //const avatar = document.getElementById("avatar") as HTMLInputElement
    
    const convertBase64 = (file: Blob) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
    
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
    
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };
    
    const uploadImage = async (event: any) => {
      const res = fetch(LoginService.backAddress+"base64", {method: "POST", body: JSON.stringify({"lol":"lol"}), credentials: 'include'});
      const file = event.target.files[0];
      const base64 = await convertBase64(file) as string
       //avatar.src = base64;
      this.base64 = base64;
      this.myFilename = file.name
       
    };
    
    input1.addEventListener("change", (e) => {
      uploadImage(e);
    });
    input2.addEventListener("change", (e) => {
      uploadImage(e);
    });
    input3.addEventListener("change", (e) => {
      uploadImage(e);
    });
    input4.addEventListener("change", (e) => {
      uploadImage(e);
    });

     
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

    calculateDate(date: number) : Date{
      const d = new Date(date * 1000)
      return d
    }




  createPost() :void {
    var visibility = document.getElementById("visibility") as HTMLInputElement
    var visibilityValue = visibility?.value
    var data

  if(this.base64 === "")
  {
    data = {"title": this.postForm.value.title, "content": this.postForm.value.text, "visible": visibilityValue}
  }
  else
  {
    data = {"title": this.postForm.value.title, "content": this.postForm.value.text, "visible": visibilityValue, "image":this.base64};
  }
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

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}