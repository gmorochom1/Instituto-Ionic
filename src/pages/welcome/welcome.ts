import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginEstudiantePage } from '../login-estudiante/login-estudiante';
import { LoginProfesorPage } from '../login-profesor/login-profesor';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  loginEst() {
    this.navCtrl.push(LoginEstudiantePage);
  }

  loginPro() {
    this.navCtrl.push(LoginProfesorPage);
  }
}
