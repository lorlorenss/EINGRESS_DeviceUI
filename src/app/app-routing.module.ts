import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { ErrorPageComponent } from './error-page/error-page.component';

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
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
