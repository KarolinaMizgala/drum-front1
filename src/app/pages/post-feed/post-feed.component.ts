import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
//import { IPost } from '../post';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit{

  public posts : any;

  constructor(private _postService: PostService) {}


  ngOnInit(): void {
    this._postService.getPosts().subscribe(data =>this.posts=data);
  }
  
}

