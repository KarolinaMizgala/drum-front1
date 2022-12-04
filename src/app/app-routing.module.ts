import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostFeedComponent } from './pages/post-feed/post-feed.component';
const routes: Routes = [
 {path: '', redirectTo:'post-feed', pathMatch:'full'},
 {path: 'post-feed', component: PostFeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
