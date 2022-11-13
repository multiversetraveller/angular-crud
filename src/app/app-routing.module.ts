import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogindoneComponent } from './logindone/logindone.component';
import { SigninComponent } from './signin/signin.component';

import {AuthguardGuard } from './authguard.guard';
const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signup', component: LoginComponent  },
  { path: 'logindone', component: LogindoneComponent  },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthguardGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
