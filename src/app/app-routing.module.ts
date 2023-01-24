import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LessonsFeedComponent } from './pages/lessons-feed/lessons-feed.component';
import { LessonComponent } from './pages/lesson/lesson.component'; 
import { LessonsSortedComponent } from './pages/lessons-sorted/lessons-sorted.component';
const routes: Routes = [
 {path: '', redirectTo:'post-feed', pathMatch:'full'},
 {path: 'post-feed', component: PostFeedComponent},
 {path: 'login', component: LoginComponent},
 {path: 'signup', component: SignupComponent},
 {path: 'lessons', component: LessonsFeedComponent},
 {path: 'lesson/:lesson_ID', component: LessonComponent},
 {path: "lessons-sorted/:lessons_category", component: LessonsSortedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
