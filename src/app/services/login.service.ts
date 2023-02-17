import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedState = false;

  //public static backAddress = "https://light.one.pl/"
  public static backAddress = "http://localhost:25565/"
  constructor() { }
}
