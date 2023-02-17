import { AfterViewInit, Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-licks',
  templateUrl: './licks-feed.component.html',
  styleUrls: ['./licks-feed.component.css']
})

export class LicksFeedComponent  {
  
  logged = false
  usertype = "guest"
  proString = "pro"
  adminString = "admin"

  pngString=""

  public licks: any;
  public licksForm !: FormGroup;
  private lick_ID: any;
  private licks_category: string | undefined;
  public myDate!:Date;
  
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router, private service: LoginService) {}
  ngOnInit(): void {
    this.logged = this.service.loggedState
    this.getUserType()
    this.getLicks()
    this.licksForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      date: ['']
    })
   
  }

  getUserType() :void{
    const res = fetch(LoginService.backAddress+"getUserType", {method: "GET", credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.usertype = x.userType
    });

  }

  createLick() :void {
  var title = document.getElementById("title") as HTMLInputElement
  var titleValue = title?.value
    var text = document.getElementById("text") as HTMLInputElement
    var textValue = text?.value
    var category = document.getElementById("category") as HTMLInputElement
    var categoryValue = category?.value
    
    let data = {"title": titleValue, "content": textValue, "category": categoryValue, 
              "attachments": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="]};
    
    const res = fetch(LoginService.backAddress+"setLicks", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
      this.afterCreateLick(x);
    });
  }

  afterCreateLick(s: JSON) :void{
    if(JSON.stringify(s) === JSON.stringify({"status": "OK"}))
    {
      this.getLicks()

    }
    else
    {
      //błąd przy dodawaniu lekcji
    }
  }

    getLicks() {
      const res = fetch(LoginService.backAddress+"getLicks", {method: "GET", credentials: 'include'});
      res.then(response => { return response.json(); }).then(x => {
        this.licks = x.data
      });
    }
    

  
goToLick(id: any){
  this.lick_ID=id;
this.router.navigate(["lick/"+this.lick_ID])
}
goToCategory(id: any){
  this.licks_category=id;
this.router.navigate(["licks-sorted/"+this.licks_category])
}
  setLicks() {
  var title = document.getElementById("title") as HTMLInputElement
  var titleValue = title?.value
    var text = document.getElementById("text") as HTMLInputElement
    var textValue = text?.value
    var category = document.getElementById("category") as HTMLInputElement
    var categoryValue = category?.value
  let l = (<HTMLInputElement | null>document.getElementById("fileInput"))?.files?.length;
  if (l == 0) {
    let data = {"title": titleValue, "content": textValue, "category": categoryValue, "attachments": [""]}
    const res = fetch(LoginService.backAddress+"setLicks", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
    });
  }
  else {
    let file = (<HTMLInputElement>document.getElementById("fileInput"))?.files?.item(0)
   let reader = new FileReader();
   reader.readAsDataURL(file!);
   let imageData = new Promise((resolve, reject) => {
     reader.onload = () => resolve(reader.result);
     reader.onerror = error => reject(reader.result);
   });
    let data = {"title": titleValue, "content": textValue, "category": categoryValue, "attachments": [imageData]};
    const res = fetch(LoginService.backAddress+"setLicks", {method: "POST", body: JSON.stringify(data), credentials: 'include'});
    res.then(response => { return response.json(); }).then(x => {
    });
  }
}

}