import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _url: string = "http://localhost:3000/posts"

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<IPost[]> {

    return this.http.get<IPost[]>(this._url);
  }

}
