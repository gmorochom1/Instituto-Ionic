import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CursosPage } from '../cursos/cursos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  public datosUsuario: any;
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.tab1Root  = HomePage; 
      this.tab2Root  = CursosPage;
      this.tab3Root  = AboutPage;
      this.tab4Root  = ContactPage;
    }

    ngOnInit(){
      this.datosUsuario = this.navParams.get('datosUsuario');
    }
  
    getDatos(): any{
      if(this.datosUsuario != undefined) {
        return this.datosUsuario;
      }
    }
}
