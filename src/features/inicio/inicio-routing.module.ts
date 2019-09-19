import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    /*
    canActivate: [AuthGuard],
    data: {
      permisos: ['1']
    }

     */
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
