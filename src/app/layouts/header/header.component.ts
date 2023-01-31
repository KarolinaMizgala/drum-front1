import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) { }
  public users : any;
  ngOnInit(): void {
  }

  sidebarToggle()
  {
    //toggle sidebar function
   this.document.body./*querySelector(".sidebar")?.*/classList.toggle('close');
  }
  
  getUserName():void {
    const res = fetch("http://localhost:25565/getUserName", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      console.log( JSON.stringify(x));
    });

  }

}
