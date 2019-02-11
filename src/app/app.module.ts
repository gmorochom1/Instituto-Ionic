import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginEstudiantePage } from '../pages/login-estudiante/login-estudiante';
import { LoginProfesorPage } from '../pages/login-profesor/login-profesor';
import { CursosPage } from '../pages/cursos/cursos';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CursoPage } from '../pages/curso/curso';
import { InscripcionPage } from '../pages/inscripcion/inscripcion';
import { MainProfesorPage } from '../pages/main-profesor/main-profesor';
import { CursoProfesorPage } from '../pages/curso-profesor/curso-profesor';
import { TareaPage } from '../pages/tarea/tarea';
import { EstudiantePage } from '../pages/estudiante/estudiante';
import { ProfesorPage } from '../pages/profesor/profesor';
import { AngularFireModule } from 'angularfire2';
import { ChatPage } from '../pages/chat/chat';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http';


var config = {
  apiKey: "AIzaSyDexF78m-10GQo2vyn00fjJy0j0dDirPbg",
  authDomain: "chat-ccd7d.firebaseapp.com",
  databaseURL: "https://chat-ccd7d.firebaseio.com",
  projectId: "chat-ccd7d",
  storageBucket: "chat-ccd7d.appspot.com",
  messagingSenderId: "648942067197"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    WelcomePage,
    LoginEstudiantePage,
    LoginProfesorPage,
    CursosPage,
    TabsPage,
    CursoPage,
    InscripcionPage,
    MainProfesorPage,
    CursoProfesorPage,
    TareaPage,
    EstudiantePage,
    ProfesorPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    WelcomePage,
    LoginEstudiantePage,
    LoginProfesorPage,
    CursosPage,
    TabsPage,
    CursoPage,
    InscripcionPage,
    MainProfesorPage,
    CursoProfesorPage,
    TareaPage,
    EstudiantePage,
    ProfesorPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen, AuthServiceProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
