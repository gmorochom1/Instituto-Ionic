import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginEstudiantePage } from './login-estudiante';

@NgModule({
  declarations: [
    LoginEstudiantePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginEstudiantePage),
  ],
})
export class LoginEstudiantePageModule {}
