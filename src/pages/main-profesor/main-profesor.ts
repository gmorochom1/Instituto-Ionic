import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
import { CursoProfesorPage } from '../curso-profesor/curso-profesor';
import { ProfesorPage } from '../profesor/profesor';

/**
 * Generated class for the MainProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-profesor',
  templateUrl: 'main-profesor.html',
})
export class MainProfesorPage {


  cursos: any[];
  public infoProfesor: any;
  cedula: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public app: App) {
    this.infoProfesor = this.navParams.get('datosProfesor');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainProfesorPage');

    for (let pro of this.infoProfesor) {
      this.cedula = pro.cedula;
    }
    this.authService.obtenerCursosPorProfesor(this.cedula)
      .subscribe(
        (data: any) => {
          this.cursos = data;
          console.log("data", this.cursos);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  public itemSelected(nombreCurso: string) {
    //alert("Curso seleccionado " + nombreCurso);
    for (let cur of this.cursos) {
      if (nombreCurso == cur.nombre) {
        //alert("Codigo curso> " + cur.idCurso);
        this.navCtrl.push(CursoProfesorPage, { 'codigoCurso': cur.idCurso, 'datosUsuario': this.infoProfesor });
      }
    }
  }

  public logout() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  public actualizar() {
    this.navCtrl.push(ProfesorPage, { 'cedula': this.infoProfesor });
  }

}
