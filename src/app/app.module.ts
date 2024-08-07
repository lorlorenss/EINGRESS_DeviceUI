import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppRoutingModule } from './app-routing.module'; // Check this line
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AfterLoginComponent } from './after-login/after-login.component';

import { AppComponent } from './app.component';
import { ShutdownComponent } from './shutdown/shutdown.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { VerificationComponent } from './verification/verification.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotMatchComponent } from './not-match/not-match.component';
import { NotAdminComponent } from './not-admin/not-admin.component';
import { InstructionComponent } from './instruction/instruction.component';
import { TimeoutComponent } from './timeout/timeout.component';
import { DeleteComponent } from './delete/delete.component';
import { EmergencyComponent } from './emergency/emergency.component';
import { WelcomeInternsComponent } from './welcome-interns/welcome-interns.component';

@NgModule({
  declarations: [
    AppComponent,
    AfterLoginComponent,
    ShutdownComponent,
    ConfirmationComponent,
    VerificationComponent,
    RegistrationComponent,
    NotMatchComponent,
    NotAdminComponent,
    InstructionComponent,
    TimeoutComponent,
    DeleteComponent,
    EmergencyComponent,
    WelcomeInternsComponent
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
