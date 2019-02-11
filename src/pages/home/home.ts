import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
import { CursoPage } from '../curso/curso';
import { EstudiantePage } from '../estudiante/estudiante';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cursos: any[];
  public datosUsuario: any;
  cedula: string;

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public navParams: NavParams, public app: App) {
    this.datosUsuario = navParams.data;
    //const data=JSON.parse(localStorage.getItem('datos'));
    //this.datos=data.datos;
  }

  ionViewDidLoad() {

    for (let datos of this.datosUsuario) {
      this.cedula = datos.cedula;
    }
    this.authService.obtenerCursosPorEstudiante(this.cedula)
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

  /* public itemSelected(nombreCurso: string) {
     //alert("Curso seleccionado " + nombreCurso );
     this.navCtrl.push(CursoPage, { 'misCursos': this.cursos});
   }*/
  public itemSelected(nombreCurso: string) {
    //alert("Curso seleccionado " + nombreCurso);
    for (let cur of this.cursos) {
      if (nombreCurso == cur.nombre) {
        //alert("Codigo curso> " + cur.idCurso);
        this.navCtrl.push(CursoPage, { 'misCursos': cur.idCurso, 'datosUsuario': this.datosUsuario });
      }
    }
  }
  public actualizar() {
    this.navCtrl.push(EstudiantePage, { 'cedula': this.datosUsuario });
  }
  public logout() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  objectKeys(objeto: any) {
    const keys = Object.keys(objeto);
    console.log(keys); // echa un vistazo por consola para que veas lo que hace "Object.keys"
    return keys;
  }

}






