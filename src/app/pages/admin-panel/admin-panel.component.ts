import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {


  logged = false
  username = ""
  usertype = "guest"
  empty = ""
  adminString = "admin"

  public users!: String[];
  public bannedUsers!: String[];
  public unverifiedPro!: String[];



  constructor( private router:Router, private http: HttpClient, private service:LoginService) {}

  ngOnInit(): void {
    this.getUserName()
      this.getUsers()
      this.getBannedUsers()
      this.getUnverifiedPro()
  }


    getUserType() :void{
      const res = fetch(LoginService.backAddress+"getUserType", {method: "GET", credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.usertype = x.userType
      });

    }

    getBannedUsers():void{
      const res = fetch(LoginService.backAddress+"bannedUsers", {method: "GET", credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.bannedUsers = x.data
      });
    }

    getUsers():void{
      const res = fetch(LoginService.backAddress+"nobannedUsers", {method: "GET", credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.users = x.data
      });
    }

    getUnverifiedPro():void{
      const res = fetch(LoginService.backAddress+"getUnverifiedPro", {method: "GET", credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.unverifiedPro = x.data
      });
    }



    verifyPro(login: String) :void {
      let data = {"userName": login};
      const res = fetch(LoginService.backAddress+"verifyUnverifiedPro", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.afterVerifyPro(x);
      });
    }
    afterVerifyPro(s: JSON) :void{
      if(JSON.stringify(s) === JSON.stringify({"status": "OK"}))
      {
        this.getUnverifiedPro()
      }
    }

    makeAdmin(login: String) :void {
      let data = {"userName": login};
      const res = fetch(LoginService.backAddress+"changeUserTypeToAdmin", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.afterMakeAdmin(x);
      });
    }
    afterMakeAdmin(s: JSON) :void{
      if(JSON.stringify(s) === JSON.stringify({"status": "OK"}))
      {
        //zmiana typu konta na admin udana
      }
    }


    banUser(login: String) :void {
      let data = {"userName": login};
      const res = fetch(LoginService.backAddress+"banUser", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.afterBanUser(x);
      });
    }
    afterBanUser(s: JSON) :void{
      if(JSON.stringify(s) === JSON.stringify({"status": "OK"}))
      {
        this.getUsers()
        this.getBannedUsers()
      }
    }

    unbanUser(login: String) :void {
      let data = {"userName": login};
      const res = fetch(LoginService.backAddress+"unbanUser", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.afterUnbanUser(x);
      });
    }
    afterUnbanUser(s: JSON) :void{
      if(JSON.stringify(s) === JSON.stringify({"status": "OK"}))
      {
        //odbanowanie użytkownika udane
        this.getBannedUsers()
        this.getUsers()
      }
    }
    
  getUserName() {
    const res = fetch(LoginService.backAddress+"getUserName", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.username = x.userName
    });
  }
}