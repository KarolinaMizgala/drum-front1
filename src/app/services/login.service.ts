import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public static loggedState = false;
  public static usertype = ""

  //public static backAddress = "https://light.one.pl/"
  public static backAddress = "http://localhost:25565/"

  

  constructor() { }

  ngOnInit(): void {
    LoginService.getUserType()
  }

  public static getUserType() :void{
    const res = fetch(LoginService.backAddress+"getUserType", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      LoginService.usertype = x.userType
      if(LoginService.usertype !== "guest")
      {
      LoginService.loggedState = true;
      }
    });
}
}
