import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
import { TareaPage } from '../tarea/tarea';
import { ChatPage } from '../chat/chat';
/**
 * Generated class for the CursoProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-curso-profesor',
  templateUrl: 'curso-profesor.html',
})
export class CursoProfesorPage {

  idcurso: any;
  participantes: any[];
  infoCurso: any[];
  tareas: any[];
  public datosUsuario: any;
  username: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
    this.idcurso = this.navParams.get('codigoCurso');
    this.datosUsuario = this.navParams.get('datosUsuario');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CursoProfesorPage');
    this.loadTareas(this.idcurso)
    this.authService.infoCurso(this.idcurso)
      .subscribe(
        (data: any) => {
          this.infoCurso = data;
          console.log("data", this.infoCurso);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  public loadParticipantes() {
    this.authService.obtenerParticipantes(this.idcurso)
      .subscribe(
        (data: any) => {
          this.participantes = data;
          console.log("data", this.participantes);
        },
        (error) => {
          console.log(error);
        }
      )
  }
  public irCrearTarea() {
    this.navCtrl.push(TareaPage, { 'id': this.idcurso });
  }

  public loadTareas(idcurso: any) {
    this.authService.obtenerTareas(idcurso)
      .subscribe(
        (data: any) => {
          this.tareas = data;
          console.log("data", this.tareas);
        },
        (error) => {
          console.log(error);
        }
      )
  }
  public loadChat() {
    for (let datos of this.datosUsuario) {
      this.username = datos.nombre;
    }
    this.navCtrl.push(ChatPage, { 'datosUsuario': this.username, 'infoCurso': this.infoCurso });
  }
}
