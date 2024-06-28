import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ShutdownComponent } from './shutdown/shutdown.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { VerificationComponent } from './verification/verification.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotMatchComponent } from './not-match/not-match.component';
import { NotAdminComponent } from './not-admin/not-admin.component';
const routes: Routes = [
  { path: '', redirectTo: 'landingPage', pathMatch: 'full'},
  { 
    path: 'landingPage', 
    component: LandingPageComponent,
  },
  {
    path: 'afterLoginPage',
    component: AfterLoginComponent
  },
  {
    path: 'errorPage',
    component: ErrorPageComponent
  },
  {
    path: 'shutdown',
    component: ShutdownComponent
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent
  },
  {
    path: 'verification',
    component: VerificationComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'notMatch',
    component: NotMatchComponent
  },
  {
    path: 'notAdmin',
    component: NotAdminComponent
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
