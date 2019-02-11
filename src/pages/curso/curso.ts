import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the CursoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-curso',
  templateUrl: 'curso.html',
})
export class CursoPage {

  idcurso: any;
  participantes: any[];
  tareas: any[];
  infoCurso: any[];
  public datosUsuario: any;
  username: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
    this.idcurso = this.navParams.get('misCursos');
    this.datosUsuario = this.navParams.get('datosUsuario');
  }

  ionViewDidLoad() {
    this.loadTareas();
    console.log('ionViewDidLoad CursoProfesorPage');
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

  public loadTareas() {
    this.authService.obtenerTareas(this.idcurso)
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
      this.username = datos.nombres;
    }
    this.navCtrl.push(ChatPage, { 'datosUsuario': this.username , 'infoCurso': this.infoCurso});
  }
}
