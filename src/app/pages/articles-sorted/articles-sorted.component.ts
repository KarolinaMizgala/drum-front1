import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-articles-sorted',
  templateUrl: './articles-sorted.component.html',
  styleUrls: ['./articles-sorted.component.css']
})
export class ArticlesSortedComponent {
  public articles: any;
  public articlesForm !: FormGroup;
  public article_ID: any ;
  public articles_category =this.route.snapshot.params['articles_category'] ;
  public myDate!:Date;
  
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router, private route:ActivatedRoute , private loginService:LoginService) {}
  ngOnInit(): void {
    this.articlesForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      date: ['']
    })
    this.getArticles()
  }
  goToArticle(id: any){
  this.article_ID=id;
this.router.navigate(["article/"+this.article_ID])
}

getArticles() {
  const res = fetch(LoginService.backAddress+"getArticles", {method: "GET", credentials: 'include'});
  res.then(response => { return response.json(); }).then(x => {
    this.articles = x.data
  });
}

}
