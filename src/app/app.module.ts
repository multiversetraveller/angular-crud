import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OneSignal } from 'onesignal-ngx';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule} from '@angular/fire/compat/storage'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LogindoneComponent } from './logindone/logindone.component';

import { AuthServiceService } from './auth-service.service';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { CustompipePipe } from './custompipe.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogindoneComponent,
    SigninComponent,
    HomeComponent,
    CustompipePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    NgbModule,
    
  ],
  providers: [OneSignal,AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
