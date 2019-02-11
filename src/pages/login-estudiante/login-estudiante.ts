import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginEstudiantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-estudiante',
  templateUrl: 'login-estudiante.html',
})
export class LoginEstudiantePage {
  email: string = "";
  password: string = "";
  datos: any;

  constructor(public navCtrl: NavController, public http: Http, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginEstudiantePage');
  }
  mostrarMenu() {
    this.navCtrl.push(TabsPage);
  }

  public consultar() {
    let cabecera = new Headers({
      'Accept': 'application/json'
    });
    let opciones = new RequestOptions({ headers: cabecera });
    this.http.get('http://35.229.52.113/Proyecto-Interciclo/srv/estudiante/loginEst?email=' + this.email + '&password=' + this.password, opciones)
      .map(res => res.json())
      .subscribe(datos => {
        console.log("Datos: ", datos);
        if (datos.length == 0) {
          this.showAlert('Error', 'No se pudo validar sus credenciales');
        } else {
          this.showAlert('Instituto Palmer Technology', 'Bienvenido');
          this.datos = datos;
          this.navCtrl.push(TabsPage, { 'datosUsuario': datos })
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
