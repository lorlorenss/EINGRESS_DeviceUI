import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppRoutingModule } from './app-routing.module'; // Check this line
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AfterLoginComponent } from './after-login/after-login.component';

import { AppComponent } from './app.component';
import { ShutdownComponent } from './shutdown/shutdown.component';

@NgModule({
  declarations: [
    AppComponent,
    AfterLoginComponent,
    ShutdownComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
