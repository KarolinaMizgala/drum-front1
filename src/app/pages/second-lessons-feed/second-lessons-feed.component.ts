import { Component, OnInit } from '@angular/core';
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
  date: Date;
  attachment: String;
} 

@Component({
  selector: 'app-second-lessons-feed',
  templateUrl: './second-lessons-feed.component.html',
  styleUrls: ['./second-lessons-feed.component.css']
})
export class SecondLessonsFeedComponent implements OnInit{


  logged = false
  username = ""
  usertype = "guest"
  empty = ""
  slideIndex = 0;

  base64 = ""
  base64Array: string[] = []
  arrayEmpty = true
  backAddress = ""

  private lesson_ID: any;
  lessons_category: string | undefined;


  public posts!: Post[];
  public lessons: any
  public postForm !: FormGroup;

  public myDate!: Date;

  constructor(private formBuilder : FormBuilder, private router:Router, private http: HttpClient, private service:LoginService, public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
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
      //this.base64 = base64;
      this.base64Array.push(base64)
      this.arrayEmpty = false
       
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

    this.backAddress = LoginService.backAddress
    this.logged = LoginService.loggedState


    this.postForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      attachment:  [''],
      visible: new FormControl('', [Validators.required]),
      date: ['']
    })

    
    

    if(!this.logged)
    {
      //this.router.navigate(['login'])
    }
    this.getPosts();
    if(this.logged)
    {
      this.getUserName()
      this.getUserType()
    }
  }
    getUserType() :void{
      const res = fetch(LoginService.backAddress+"getUserType", {method: "GET", credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.usertype = x.userType
      });

    
    }
    getUserName() {
      const res = fetch(LoginService.backAddress+"getUserName", {method: "GET", credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.username = x.userName
      });
    }

    getPosts() {
      const res = fetch(LoginService.backAddress+"getLessons", {method: "GET", credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.lessons = x.data
      });
    }
  
  
  
  
  
    createPost() :void {
      var category = document.getElementById("category") as HTMLInputElement
      var categoryValue = category?.value
      var data
  
    if(this.base64Array.length === 0)
    {
      data = {"title": this.postForm.value.title, "content": this.postForm.value.text, "brief": this.postForm.value.desc, "category": categoryValue}
    }
    else
    {
      data = {"title": this.postForm.value.title, "content": this.postForm.value.text, "brief": this.postForm.value.desc,"category": categoryValue, "attachments":this.base64Array};
    }
      const res = fetch(LoginService.backAddress+"setLesson", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
      res.then(response => { return response.json(); })
  }

    goToCategory(id: any){
      this.lessons_category=id;
    this.router.navigate(["lessons-sorted/"+this.lessons_category])
    }
  
    goToLesson(id: any){
      this.lesson_ID=id;
    this.router.navigate(["lesson/"+this.lesson_ID])
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

