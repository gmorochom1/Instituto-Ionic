import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { MainProfesorPage } from '../main-profesor/main-profesor';
/**
 * Generated class for the LoginProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-profesor',
  templateUrl: 'login-profesor.html',
})
export class LoginProfesorPage {
  
  email: string = "";
  password: string = "";
  datosProfesor: any;

  constructor(public navCtrl: NavController, public http: Http, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginProfesorPage');
  }
  mostrarMenu() {
    this.navCtrl.push(TabsPage);
  }

  public consultar() {
    let cabecera = new Headers({
      'Accept': 'application/json'
    });
    let opciones = new RequestOptions({ headers: cabecera });
    this.http.get('http://35.229.52.113/Proyecto-Interciclo/srv/profesor/loginPro?email=' + this.email + '&password=' + this.password, opciones)
      .map(res => res.json())
      .subscribe(data => {
        console.log("Datos: ", data);
        if (data.length == 0) {
          this.showAlert('Error', 'No se pudo validar sus credenciales');
        } else {
          this.showAlert('Instituto Palmer Technology', 'Bienvenido');
          this.datosProfesor = data;
          this.navCtrl.push(MainProfesorPage, { 'datosProfesor': this.datosProfesor })
        }
      }), err => {
        console.log("Error: " + err);
      };

  }

  showAlert(title: string, message: string) {
    let alertBox = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alertBox.present();
  }
}
