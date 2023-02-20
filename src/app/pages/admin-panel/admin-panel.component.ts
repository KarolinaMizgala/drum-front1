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
  proString = "pro"
  proUnverifiedString = "proUnverified"
  amateurString = "amateur"

  public users!: any;
  public bannedUsers!: any;
  public unverifiedPro!: any;

  proAmount = 0
  usersAmount = 0
  proUnverifiedAmount = 0
  amateursAmount = 0



  constructor( private router:Router, private http: HttpClient, private service:LoginService) {}

  ngOnInit(): void {
    this.getUserName()

      this.getUsersAmounts()
      this.getUsersLists()


      if(!LoginService.loggedState)
      this.router.navigate(["/login"])
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
        this.getUsersLists()
        this.getUsersAmounts()
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
        this.getUsersLists()
        this.getUsersAmounts()
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
        this.getUsersLists()
        this.getUsersAmounts()
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
        this.getUsersLists()
        this.getUsersAmounts()
      }
    }
    
  getUserName() {
    const res = fetch(LoginService.backAddress+"getUserName", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.username = x.userName
    });
  }

  getProAmount():void{
    const res = fetch(LoginService.backAddress+"getProAmount", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.proAmount = x.amount
    });
  }
  getUsersAmount():void{
    const res = fetch(LoginService.backAddress+"getUsersAmount", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.usersAmount = x.amount
    });
  }
  getProUnverifiedAmount():void{
    const res = fetch(LoginService.backAddress+"getProUnverifiedAmount", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.proUnverifiedAmount = x.amount
    });
  }
  getAmateursAmount():void{
    const res = fetch(LoginService.backAddress+"getAmateursAmount", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.amateursAmount = x.amount
    });
  }
  getUsersAmounts():void{
    this.getProAmount()
    this.getAmateursAmount()
    this.getUsersAmount()
    this.getProUnverifiedAmount()
  }
  getUsersLists():void{
    this.getUsers()
    this.getBannedUsers()
    this.getUnverifiedPro()
  }
}