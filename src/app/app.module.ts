import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialExampleModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAppointmentComponent } from './components/appointments/add-appointment/add-appointment.component';
import { AppointmentListComponent } from './components/appointments/appointment-list/appointment-list.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { HeaderComponent } from './components/header/header.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentListComponent,
    AddAppointmentComponent,
    AddPostComponent,
    HeaderComponent,
    PostListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MaterialExampleModule,
    CommonModule,
    CdkAccordionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
