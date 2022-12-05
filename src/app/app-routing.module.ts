import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { SignupComponent } from './pages/signup/signup.component';
const routes: Routes = [
 {path: '', redirectTo:'post-feed', pathMatch:'full'},
 {path: 'post-feed', component: PostFeedComponent},
 {path: 'login', component: LoginComponent},
 {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
