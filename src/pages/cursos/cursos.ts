import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-cursos',
  templateUrl: 'cursos.html',
})
export class CursosPage {

  cursos: any[];
  public datosUsuario: any;
  cedula: string;

  constructor(public navCtrl: NavController, public hhtp: Http, public authService: AuthServiceProvider, public navParams: NavParams) {
    this.datosUsuario = navParams.data;
  }

  public itemSelected(nombreCurso: string) {
    for (let cur of this.cursos) {
      if (nombreCurso == cur.nombre) {
        //this.navCtrl.push(InscripcionPage, {'codCurso': cur.idCurso});
      }
    }
  }

  ionViewDidLoad() {
    for (let datos of this.datosUsuario) {
      this.cedula = datos.cedula;
    }
    this.authService.obtenerCursosFiltro(this.cedula)
      .subscribe(
        (data: any) => {
          this.cursos = data;
          console.log("data", this.cursos);
        },
        (error) => {
          console.log(error);
        }
      );

  }


}
