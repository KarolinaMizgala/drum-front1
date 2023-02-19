import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  logged = false

  username = ""
  backAddress = ""

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient, private service: LoginService) { }
  public users : any;

  
  ngOnInit(): void {
    this.logged = this.service.loggedState
    if(this.logged)
    {
    this.getUserName();
    }
    this.backAddress = LoginService.backAddress
  }

  sidebarToggle()
  {
    //toggle sidebar function
   this.document.body./*querySelector(".sidebar")?.*/classList.toggle('close');
  }
  

  getUserName() {
    const res = fetch(LoginService.backAddress+"getUserName", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      document.getElementById("getUserNameOutput")!.innerHTML = x.userName
      this.username = x.userName
    });
  }

  }

 

