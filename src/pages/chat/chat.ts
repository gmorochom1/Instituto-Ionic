import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, } from 'angularfire2/database';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string = '';
  message: string = '';
  _chatSubscription;
  messages: object[] = [];
  infoCurso: any[];
  cursoNombre: string = '';

  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
    this.username = this.navParams.get('datosUsuario');
    this.infoCurso = this.navParams.get('infoCurso');
    for (let cur of this.infoCurso) {
      this.cursoNombre = cur.nombre;
      this._chatSubscription = this.db.list('/chat' + this.cursoNombre).subscribe(data => {
        this.messages = data;
      });
    }
  }

  sendMessage() {
    this.db.list('/chat' + this.cursoNombre).push({
      username: this.username,
      message: this.message
    }).then(() => {
    }).catch(() => {
    });
    this.message = '';
  }

  ionViewDidLoad() {
    this.db.list('/chat' + this.cursoNombre).push({
      specialMessage: true,
      message: `${this.username} se unio al chat`
    });
  }

  ionViewWillLeave() {
    this._chatSubscription.unsubscribe();
    this.db.list('/chat' + this.cursoNombre).push({
      specialMessage: true,
      message: `${this.username} salio del chat`
    });
  }
}