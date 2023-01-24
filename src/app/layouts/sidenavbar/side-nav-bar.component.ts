import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common'
@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }


  sidebarToggle()
  {
    //toggle sidebar function
   this.document.body./*querySelector(".sidebar")?.*/classList.toggle('close');
  }

}
