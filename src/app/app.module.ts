import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './authentication/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { ApiService } from './shared/api.service';
import { CreateAccountComponent } from './authentication/create-account/create-account.component';
import { AlertComponent } from './shared/alert/alert.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import * as firebase from 'firebase';
import { ResetPasswordComponent } from './authentication/forgot-password/reset-password/reset-password.component';
import { VerifyOTPComponent } from './authentication/verify-otp/verify-otp.component';

firebase.initializeApp({
  apiKey: "AIzaSyATfZFcqhGE2-8--hKteVtUsADjPxlxwlY",
  authDomain: "skenterprises-b2a27.firebaseapp.com",
  databaseURL: "https://skenterprises-b2a27.firebaseio.com",
  projectId: "skenterprises-b2a27",
  storageBucket: "skenterprises-b2a27.appspot.com",
  messagingSenderId: "531917597461",
  appId: "1:531917597461:web:43f98238338d022a0b571c",
  measurementId: "G-2YJS56HCT2"
});

@NgModule({
  declarations: [AppComponent, ResetPasswordComponent, VerifyOTPComponent, LoginComponent, CreateAccountComponent, ForgotPasswordComponent, AlertComponent, LoadingComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [
    StatusBar,
    ApiService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
