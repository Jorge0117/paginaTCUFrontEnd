import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';
import {FormsAreasDeInteresComponent} from './forms-areas-de-interes.component';


const routes: Routes = [
  {
    path: 'areasdeinteres/:modo/:id',
    component: FormsAreasDeInteresComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FormsAreasDeInteresRoutingModule { }
