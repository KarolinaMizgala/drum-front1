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
  slideIndex = 0;

  base64 = ""
  backAddress = ""

  public posts!: Post[];
  public postForm !: FormGroup;

  public myDate!: Date;

  constructor(private _postService: PostService, private formBuilder : FormBuilder, private router:Router, private http: HttpClient, private service:LoginService, public sanitizer: DomSanitizer) {}

  ngOnInit(): void {

    this.backAddress = LoginService.backAddress
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

    
    const inputPng11 = document.getElementById("selectAvatarPng1") as HTMLInputElement
    const inputPng22 = document.getElementById("selectAvatarPng2") as HTMLInputElement
    const inputPng33 = document.getElementById("selectAvatarPng3") as HTMLInputElement
    const inputPng44 = document.getElementById("selectAvatarPng4") as HTMLInputElement
    const avatar = document.getElementById("avatar") as HTMLInputElement
    
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
       avatar.src = base64;
      this.base64 = base64;
      const res = fetch(LoginService.backAddress+"base64", {method: "POST", body: JSON.stringify({"lol":"lol"}), credentials: 'include'});
    };
    
    inputPng11.addEventListener("change", (e) => {
      uploadImage(e);
    });
    inputPng22.addEventListener("change", (e) => {
      uploadImage(e);
    });
    inputPng33.addEventListener("change", (e) => {
      uploadImage(e);
    });
    inputPng44.addEventListener("change", (e) => {
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