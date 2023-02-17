import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LessonsFeedComponent } from './pages/lessons-feed/lessons-feed.component';
import { LessonComponent } from './pages/lesson/lesson.component'; 
import { LessonsSortedComponent } from './pages/lessons-sorted/lessons-sorted.component';
import { AccountComponent } from './pages/account/account.component';
import { ArticlesFeedComponent } from './pages/articles-feed/articles-feed.component';
import { ArticleComponent } from './pages/article/article.component';
import { ArticlesSortedComponent } from './pages/articles-sorted/articles-sorted.component';
import { LicksFeedComponent } from './pages/licks-feed/licks-feed.component';
import { LickComponent } from './pages/lick/lick.component';
import { LicksSortedComponent } from './pages/licks-sorted/licks-sorted.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';


const routes: Routes = [
 {path: '', redirectTo:'post-feed', pathMatch:'full'},
 {path: 'post-feed', component: PostFeedComponent},
 {path: 'login', component: LoginComponent},
 {path: 'signup', component: SignupComponent},
 {path: 'lessons', component: LessonsFeedComponent},
 {path: 'lesson/:lesson_ID', component: LessonComponent},
 {path: "lessons-sorted/:lessons_category", component: LessonsSortedComponent},
 {path: "account", component: AccountComponent},
 {path: "articles", component: ArticlesFeedComponent},
 {path: "article/:article_ID", component: ArticleComponent},
 {path: "articles-sorted/:article_category", component: ArticlesSortedComponent},
 {path: "licks", component: LicksFeedComponent},
 {path: "lick/:lick_ID", component: LickComponent},
 {path: "licks-sorted/:lick_category", component: LicksSortedComponent},
 {path: "admin-panel", component: AdminPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
