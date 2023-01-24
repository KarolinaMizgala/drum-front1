import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { PostService } from './services/post.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';

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
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from 'ngx-owl-carousel-o/public_api';
import { FormsModule } from '@angular/forms';
import { LessonComponent } from './pages/lesson/lesson.component';
import { LessonsFeedComponent } from './pages/lessons-feed/lessons-feed.component';
import { LessonsSortedComponent } from './pages/lessons-sorted/lessons-sorted.component';

@NgModule({
  declarations: [
    AppComponent,
    PostFeedComponent,
    SideNavBarComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    LessonsFeedComponent,
    LessonComponent,
    LessonsSortedComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule, 
    ReactiveFormsModule,
RouterModule,
CarouselModule, 
FormsModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
