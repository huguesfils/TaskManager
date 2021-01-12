import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';


export const firebaseConfig = {
    apiKey: "AIzaSyAmwnFnMefJ7BSKO6a1F2X3vxm9zNQpVC8",
    authDomain: "task-manager-13216.firebaseapp.com",
    databaseURL: "https://task-manager-13216-default-rtdb.firebaseio.com",
    projectId: "task-manager-13216",
    storageBucket: "task-manager-13216.appspot.com",
    messagingSenderId: "400399678439",
    appId: "1:400399678439:web:f018fe2ac4b3f2579b5b42",
    measurementId: "G-ME0274T58N"
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
