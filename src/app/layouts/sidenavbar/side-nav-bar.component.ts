import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {


  logged = false
  usertype = "admin"
  adminString = "admin"

  constructor(@Inject(DOCUMENT) private document: Document, private router:Router,private service:LoginService) { }

  ngOnInit(): void {
    this.logged = this.service.loggedState
    this.getUserType()
  }


  sidebarToggle()
  {
    //toggle sidebar function
   this.document.body./*querySelector(".sidebar")?.*/classList.toggle('close');
  }
  logout() {
    const res = fetch(LoginService.backAddress+"logout", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.afterLogout(x);
    });
  }

  afterLogout(x:JSON)
  {
    this.service.loggedState = false
    this.router.navigate(['login'])
  }

  getUserType() :void{
    const res = fetch(LoginService.backAddress+"getUserType", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.usertype = x.userType
    });

  }

}
