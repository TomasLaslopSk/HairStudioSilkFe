import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppointmentComponent } from './components/appointments/add-appointment/add-appointment.component';
import { AppointmentListComponent } from './components/appointments/appointment-list/appointment-list.component';
import { HomeComponent } from './components/home/home.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'addAppointment', component: AddAppointmentComponent},
  { path: 'blog', component: PostListComponent },
  { path: 'addPost', component: AddPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
