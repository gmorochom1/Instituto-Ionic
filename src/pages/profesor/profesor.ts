import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
/**
 * Generated class for the ProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profesor',
  templateUrl: 'profesor.html',
})
export class ProfesorPage {

  public datosPro: any;
  cedula: string = "";
  nombres: string = "";
  email: string = "";
  password: string = "";
  direccion: string = "";
  especialidad: string = "";
  nombreCarrera: string = "";
  director: string = "";

  constructor(public navCtrl: NavController, public http: Http, public authService: AuthServiceProvider, private toastCtrl: ToastController, public navParams: NavParams, public app: App) {
    this.datosPro = this.navParams.get('cedula');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesorPage');
    for (let datos of this.datosPro) {
      this.nombres = datos.nombre;
      this.email = datos.email;
      this.password = datos.password;
      this.direccion = datos.direccion;
      this.especialidad = datos.especialidad;
    }
  }

  actualizar() {
    for (let datos of this.datosPro) {
      var profesor = {
        "cedula": datos.cedula,
        "nombre": this.nombres,
        "email": this.email,
        "password": this.password,
        "direccion": this.direccion,
        "especialidad": this.especialidad,
        "carrera": {
          "nombre": datos.carrera.nombre,
          "director": datos.carrera.director
        }
      }
    };

    if (profesor.cedula == null || profesor.nombre == null || profesor.email == null || profesor.password == null || profesor.direccion == null || profesor.especialidad == null) {
      this.presentToast('Falta de ingresar datos');
    } else {
      console.log('Profesor', profesor)
      this.authService.actualizarProfesor(profesor).then(() => {
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
