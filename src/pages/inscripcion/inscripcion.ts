import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
/**
 * Generated class for the InscripcionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscripcion',
  templateUrl: 'inscripcion.html',
})
export class InscripcionPage {

  idcurso: any;
  infoCurso: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
    this.idcurso = this.navParams.get('codCurso');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscripcionPage');
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

}
