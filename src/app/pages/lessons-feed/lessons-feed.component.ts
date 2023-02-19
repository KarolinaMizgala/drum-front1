import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
    import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

interface Lesson {  
  id: Number;  
  title: String;
  desc: String; 
  content: String;  
  author: String;  
  date: Date;
  attachment: String;
}  
 
@Component({
  selector: 'app-lessons-feed',
  templateUrl: './lessons-feed.component.html',
  styleUrls: ['./lessons-feed.component.css']
})


export class LessonsFeedComponent implements OnInit{

  logged = false
  username = ""
  usertype = "guest"
  empty = ""
  slideIndex = 0;

  base64 = ""
  backAddress = ""
  base64Array: string[] = []

  proString = "pro"
  adminString = "admin"

  public lessons!: Lesson[];
  public lessonsThree!: Lesson[];
  public postForm !: FormGroup;
  public lessonsForm! : FormGroup;
  private lesson_ID: any;


  lessons_category: string | undefined;
  public myDate!: Date;

  constructor(private _postService: PostService, private formBuilder : FormBuilder, private router:Router, private http: HttpClient, private service:LoginService, public sanitizer: DomSanitizer) {}

  ngOnInit(): void {

    this.backAddress = LoginService.backAddress
    this.logged = this.service.loggedState
    this.getLessons();
    //this.lessonsThree = this.lessons.slice(0,3)

      this.getUserName()
      this.getUserType()

    this.postForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      attachment:  [''],
      visible: new FormControl('', [Validators.required]),
      date: ['']
    })

    
    var inputPng1 = document.getElementById("selectAvatarPng1") as HTMLInputElement
    var inputPng2 = document.getElementById("selectAvatarPng2") as HTMLInputElement
    var inputPng3 = document.getElementById("selectAvatarPng3") as HTMLInputElement
    var inputPng4 = document.getElementById("selectAvatarPng4") as HTMLInputElement


    inputPng1.addEventListener("change", (e) => {
     uploadImage(e);
    });
    inputPng2.addEventListener("change", (e) => {
      uploadImage(e);
    });
    inputPng3.addEventListener("change", (e) => {
      uploadImage(e);
    });
    inputPng4.addEventListener("change", (e) => {
      uploadImage(e);
    });
    
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
      const file = event.target.files[0];
      const base64 = await convertBase64(file) as string
      this.base64Array.push(base64);
      const res = fetch(LoginService.backAddress+"base64", {method: "POST", body: JSON.stringify({"lol":"lol"}), credentials: 'include'});
    };
    
    
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
        this.getLessons()
      }
    }

  getUserName() {
    const res = fetch(LoginService.backAddress+"getUserName", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.username = x.userName
    });
  }


    getLessons() {
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
    data = {"title": this.postForm.value.title, "content": this.postForm.value.text, "desc": this.postForm.value.desc, "category": categoryValue, "attachments": this.base64Array}
  }
  else
  {
    data = {"title": this.postForm.value.title, "content": this.postForm.value.text, "desc": this.postForm.value.desc, "category": categoryValue, "attachments": this.base64Array};
  }
    const res = fetch(LoginService.backAddress+"setLesson", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.afterCreatePost(x);
    });
  }

  afterCreatePost(s: JSON) :void{
    if(JSON.stringify(s) === JSON.stringify({"status": "OK"}))
    {
      this.getLessons()
      //dodanie posta udane

    }
    else
    {
      //błąd przy dodawaniu posta
    }
  }
  openModal() {
    (<HTMLInputElement> document.getElementById('imgModal')).style.display = "block"
   }
   closeModal() {
    (<HTMLInputElement> document.getElementById('imgModal')).style.display = "none";
   }
   plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
   }
   currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
   }
   
   showSlides(n: any) {
    let i;
    const slides = document.getElementsByClassName("img-slides") as HTMLCollectionOf < HTMLElement > ;
    const dots = document.getElementsByClassName("images") as HTMLCollectionOf < HTMLElement > ;
    if (n > slides.length) {
     this.slideIndex = 1
    }
    if (n < 1) {
     this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    if (dots && dots.length > 0) {
     dots[this.slideIndex - 1].className += " active";
    }
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