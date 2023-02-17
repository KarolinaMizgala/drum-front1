import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedState = false;

  public static backAddress = "https://light.one.pl/"

  constructor() { }
}
