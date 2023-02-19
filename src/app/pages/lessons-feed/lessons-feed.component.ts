import { AfterViewInit, Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from '../../services/post.service';
import { toArray } from 'rxjs';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons-feed.component.html',
  styleUrls: ['./lessons-feed.component.css']
})

export class LessonsFeedComponent  {
  
  logged = false
  usertype = "guest"
  proString = "pro"
  adminString = "admin"

  pngString=""

  base64Array: string[] = [];
  filenames: string[] = [];

  public lessons: any;
  public lessonsForm! : FormGroup;
  private lesson_ID: any;
  private lessons_category: string | undefined;
  public myDate!:Date;
  
  constructor(private _lessonService: LessonService,private formBuilder : FormBuilder, private http: HttpClient, private router:Router, private service: LoginService) {}
  ngOnInit(): void {
    this.logged = this.service.loggedState

    if(!this.logged)
    {
      this.router.navigate(["login"])
    }

    this.getUserType()
    this.getLessons()
    this.lessonsForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      date: ['']
    })
    
    const inputPng1 = document.getElementById("selectAvatarPng1") as HTMLInputElement
    const inputPng2 = document.getElementById("selectAvatarPng2") as HTMLInputElement
    const inputPng3 = document.getElementById("selectAvatarPng3") as HTMLInputElement
    const inputPng4 = document.getElementById("selectAvatarPng4") as HTMLInputElement
    const avatar = document.getElementById("avatar") as HTMLInputElement
    const textArea = document.getElementById("textArea") as HTMLInputElement
    
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
      textArea.innerText = base64;
      this.base64Array.push(base64)

      var fullPath = event.target.value
      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      this.filenames.push(filename);
      textArea.innerText = ""
      this.filenames.forEach(element => {
        textArea.innerText += element + "\n"
      });
    };
    
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
  }

  getUserType() :void{
    const res = fetch(LoginService.backAddress+"getUserType", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.usertype = x.userType
    });

  }

  createLesson() :void {
    var category = document.getElementById("category") as HTMLInputElement
    var categoryValue = category?.value
    var data

  if(this.base64Array.length === 0)
  {
    data = {"title": this.lessonsForm.value.title, "content": this.lessonsForm.value.text, "desc": this.lessonsForm.value.desc, "category": categoryValue}
  }
  else
  {
    data = {"title": this.lessonsForm.value.title, "content": this.lessonsForm.value.text, "desc": this.lessonsForm.value.desc, "category": categoryValue, attachments:[]}
  }
    const res = fetch(LoginService.backAddress+"setLesson", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.afterCreateLesson(x);
    });
  }

  afterCreateLesson(s: JSON) :void{
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

    getLessons() {
      const res = fetch(LoginService.backAddress+"getLessons", {method: "GET", credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.lessons = x.data
      });
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