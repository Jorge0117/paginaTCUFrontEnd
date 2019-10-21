import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsultarArticulosComponent} from './consultar-articulos/consultar-articulos.component';
import {FormArticulosComponent} from './form-articulos/form-articulos.component';
import {ConsultarArticulosRoutingModule} from './consultar-articulos/consultar-articulos-routing.module';
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



@NgModule({
  declarations: [
    ConsultarArticulosComponent,
    FormArticulosComponent
  ],
  imports: [
    CommonModule,
    ConsultarArticulosRoutingModule,
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
    ConsultarArticulosComponent,
    FormArticulosComponent
  ]
})
export class ArticulosModule { }
