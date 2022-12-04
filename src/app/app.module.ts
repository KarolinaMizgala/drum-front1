import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { PostService } from './post.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { HeaderComponent } from './layouts/header/header.component';
import { SideNavBarComponent } from './layouts/sidenavbar/side-nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './layouts/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PostFeedComponent,
    SideNavBarComponent,
    HeaderComponent,
    FooterComponent

  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule, 
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
