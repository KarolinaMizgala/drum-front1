import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  public articles: any;
  public articlesForm !: FormGroup;
  public article_ID =this.route.snapshot.params['article_ID'] ;
  public myDate!:Date;
  
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router, private route:ActivatedRoute, private loginService: LoginService) {}
  ngOnInit(): void {
    //this._lessonService.getPosts().subscribe(data => this.lessons = data);

    this.articlesForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      date: ['']
    })
    this.getArticles()
  }
  getArticles() {
    const res = fetch(LoginService.backAddress+"getArticles", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.articles = x.data
    });
  }


}
