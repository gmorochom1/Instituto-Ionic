import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
import { CursoProfesorPage } from '../curso-profesor/curso-profesor';
/**
 * Generated class for the TareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tarea',
  templateUrl: 'tarea.html',
})
export class TareaPage {

  descripcion: string = "";
  fechaEntrega: Date;
  calificacion: string = "";
  idCurso: any;
  infoCurso: any;

  constructor(public navCtrl: NavController, public http: Http, public authService: AuthServiceProvider, private toastCtrl: ToastController, public navParams: NavParams) {
    this.idCurso = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TareaPage');
    this.authService.infoCurso(this.idCurso)
      .subscribe(
        (data: any) => {
          this.infoCurso = data;
          console.log("data", this.infoCurso);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  insertarTarea() {
    for (let curso of this.infoCurso) {
      var tarea = {
        "descripcion": this.descripcion,
        "fechaEntrega": this.fechaEntrega,
        "calificacion": this.calificacion,
        "curso": {
          "idCurso": curso.idCurso,
          "nombre": curso.nombre,
          "fechaInicio": curso.fechaInicio,
          "fechaFin": curso.fechaFin,
          "dias": curso.dias,
          "horario": curso.horario,
          "costo": curso.costo,
          "carrera": {
            "nombre": curso.carrera.nombre,
            "director": curso.carrera.director
          },
          "profesor": {
            "cedula": curso.profesor.cedula,
            "nombre": curso.profesor.nombre,
            "email": curso.profesor.email,
            "password": curso.profesor.password,
            "direccion": curso.profesor.direccion,
            "especialidad": curso.profesor.especialidad,
            "carrera": {
              "nombre": curso.profesor.carrera.nombre,
              "director": curso.profesor.carrera.director
            }
          }
        }
      }
    };

    if (tarea.descripcion == null || tarea.fechaEntrega == null || tarea.calificacion == null) {
      this.presentToast('Falta de ingresar datos');
    } else {
      console.log('Tarea', tarea)
      this.authService.insertar(tarea).then(() => {
        this.presentToast('Tarea registrada');
        this.descripcion = "";
        this.calificacion = "";
        this.navCtrl.push(CursoProfesorPage, { 'codigoCurso': this.idCurso });
      })
        .catch((error) => {
          this.presentToast('No se pudo registrar la tarea' + error.error);
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
