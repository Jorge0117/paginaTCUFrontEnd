import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsUsuariosComponent} from './forms-usuarios.component';


const routes: Routes = [
  {
    path: 'usuarios/:modo/:correo',
    component: FormsUsuariosComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FormsUsuariosRoutingModule { }
