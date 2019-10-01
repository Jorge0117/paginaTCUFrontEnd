import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsultarUsuariosRoutingModule} from '../usuarios/consultar-usuarios/consultar-usuarios-routing.module';
import {FormsUsuariosRoutingModule} from '../usuarios/forms-usuarios/forms-usuarios-routing.module';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConsultarAreasDeInteresRoutingModule} from './consultar-areas-de-interes/consultar-areas-de-interes-routing.module';
import {ConsultarAreasDeInteresComponent} from './consultar-areas-de-interes/consultar-areas-de-interes.component';
import {FormsAreasDeInteresComponent} from './forms-areas-de-interes/forms-areas-de-interes.component';
import {FormsAreasDeInteresRoutingModule} from './forms-areas-de-interes/forms-areas-de-interes-routing.module';



@NgModule({
  declarations: [
    ConsultarAreasDeInteresComponent,
    FormsAreasDeInteresComponent
  ],
  imports: [
    CommonModule,
    ConsultarAreasDeInteresRoutingModule,
    FormsAreasDeInteresRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    ConsultarAreasDeInteresComponent,
    FormsAreasDeInteresComponent
  ]
})
export class AreasDeInteresModule { }
