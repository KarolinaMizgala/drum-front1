import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  logged = false

  constructor(@Inject(DOCUMENT) private document: Document, private service: LoginService) { }
  public users : any;
  ngOnInit(): void {
    this.logged = this.service.loggedState
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
