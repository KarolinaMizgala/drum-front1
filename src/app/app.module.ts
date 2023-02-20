import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PostFeedComponent, SafePipe } from './pages/post-feed/post-feed.component';
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

import { FormsModule } from '@angular/forms';
import { SecondLessonsFeedComponent } from './pages/second-lessons-feed/second-lessons-feed.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { LessonsSortedComponent } from './pages/lessons-sorted/lessons-sorted.component';
import { AccountComponent } from './pages/account/account.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdsBarComponent } from './ads-bar/ads-bar.component';
import { ArticlesFeedComponent } from './pages/articles-feed/articles-feed.component';
import { ArticlesSortedComponent } from './pages/articles-sorted/articles-sorted.component';
import { LicksFeedComponent } from './pages/licks-feed/licks-feed.component';
import { LicksSortedComponent } from './pages/licks-sorted/licks-sorted.component';
import { LickComponent } from './pages/lick/lick.component';

@NgModule({
  declarations: [
    AppComponent,
    PostFeedComponent,
    SideNavBarComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    SecondLessonsFeedComponent,
    LessonComponent,
    LessonsSortedComponent,
    AccountComponent,
    AdminPanelComponent,
    AdsBarComponent,
    ArticlesFeedComponent,
    ArticlesSortedComponent,
    LicksFeedComponent,
    LicksSortedComponent,
    LickComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule, 
    ReactiveFormsModule,
RouterModule,
FormsModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
