import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IPost } from '../interfaces/post';
@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private _url: string = "http://localhost:3000/lessons"

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<IPost[]> {

    return this.http.get<IPost[]>(this._url);
  }
 
}
