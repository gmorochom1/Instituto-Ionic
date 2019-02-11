import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CursoProfesorPage } from './curso-profesor';

@NgModule({
  declarations: [
    CursoProfesorPage,
  ],
  imports: [
    IonicPageModule.forChild(CursoProfesorPage),
  ],
})
export class CursoProfesorPageModule {}
