//import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http'
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  cedula: string;
  loggedIn: boolean;
  url = 'http://35.229.52.113/Proyecto-Interciclo/srv/estudiante/list';


  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
    this.cedula = '';
    this.loggedIn = false;
  }

  obtenerEstudiantes() {
    return this.http.get('http://35.229.52.113/Proyecto-Interciclo/srv/estudiante/list').map(res => res.json());
  }

  obtenerCursos() {
    return this.http.get('http://35.229.52.113/Proyecto-Interciclo/srv/curso/list').map(res => res.json());
  }

  obtenerCursosFiltro(cedula: string) {
    return this.http.get('http://35.229.52.113/Proyecto-Interciclo/srv/inscripcion/filtroCursos?cedula=' + cedula).map(res => res.json());
  }

  obtenerCursosPorEstudiante(cedula: string) {
    return this.http.get('http://35.229.52.113/Proyecto-Interciclo/srv/inscripcion/misCursos?cedula=' + cedula).map(res => res.json());
  }

  obtenerCursosPorProfesor(cedula: string) {
    return this.http.get('http://35.229.52.113/Proyecto-Interciclo/srv/curso/misCursos?cedula=' + cedula).map(res => res.json());
  }

  obtenerParticipantes(codigo: any) {
    return this.http.get('http://35.229.52.113/Proyecto-Interciclo/srv/inscripcion/participantes?idCurso=' + codigo).map(res => res.json());
  }

  obtenerTareas(codigo: any) {
    return this.http.get('http://35.229.52.113/Proyecto-Interciclo/srv/tarea/tareas?idCurso=' + codigo).map(res => res.json());
  }

  infoCurso(codigo: any) {
    return this.http.get('http://35.229.52.113/Proyecto-Interciclo/srv/curso/infoCurso?idcurso=' + codigo).map(res => res.json());
  }

  insertar(user: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://35.229.52.113/Proyecto-Interciclo/srv/tarea/insert', user)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  actualizarEstudiante(user: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://35.229.52.113/Proyecto-Interciclo/srv/estudiante/update', user)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  actualizarProfesor(user: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://35.229.52.113/Proyecto-Interciclo/srv/profesor/update', user)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  login(estudiante) {
    let url = `${this.url}/list`;
    let iJon = JSON.stringify(estudiante);

    return this.http.post(url, iJon, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .map(res => res.text())
      .map(res => {
        if (res == "error" || res == "nofound") {
          this.loggedIn = false;
        } else {
          localStorage.setItem('token', res);
          this.cedula = estudiante.cedula;
          this.loggedIn = true;
        }
        return this.loggedIn;
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.cedula = '';
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
