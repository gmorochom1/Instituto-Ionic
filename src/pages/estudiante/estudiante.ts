import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
/**
 * Generated class for the EstudiantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estudiante',
  templateUrl: 'estudiante.html',
})
export class EstudiantePage {

  public datosEst: any;
  cedula: string = "";
  nombres: string = "";
  email: string = "";
  password: string = "";
  direccion: string = "";

  constructor(public navCtrl: NavController, public http: Http, public authService: AuthServiceProvider, private toastCtrl: ToastController, public navParams: NavParams, public app: App) {
    this.datosEst = this.navParams.get('cedula');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstudiantePage');
    for (let datos of this.datosEst) {
      this.cedula = datos.cedula;
      this.nombres = datos.nombres;
      this.email = datos.email;
      this.password = datos.password;
      this.direccion = datos.direccion;
    }
  }

  actualizar() {
    var estudiante = {
      "cedula": this.cedula,
      "nombres": this.nombres,
      "email": this.email,
      "password": this.password,
      "direccion": this.direccion
    };

    if (estudiante.cedula == null || estudiante.nombres == null || estudiante.email == null || estudiante.password == null || estudiante.direccion == null) {
      this.presentToast('Falta de ingresar datos');
    } else {
      console.log('Estudiante', estudiante)
      this.authService.actualizarEstudiante(estudiante).then(() => {
        this.presentToast('Informacion Actualizada');
        const root = this.app.getRootNav();
        root.popToRoot();
      })
        .catch((error) => {
          this.presentToast('No se pudo registrar' + error.error);
        });
    }
  }

  presentToast(mensaje: any) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
