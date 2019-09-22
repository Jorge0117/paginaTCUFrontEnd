import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsultarUsuariosComponent} from './consultar-usuarios/consultar-usuarios.component';
import {ConsultarUsuariosRoutingModule} from './consultar-usuarios/consultar-usuarios-routing.module';
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
import {FormsUsuariosRoutingModule} from './forms-usuarios/forms-usuarios-routing.module';
import {FormsUsuariosComponent} from './forms-usuarios/forms-usuarios.component';



@NgModule({
  declarations: [
    ConsultarUsuariosComponent,
    FormsUsuariosComponent
  ],
  imports: [
    CommonModule,
    ConsultarUsuariosRoutingModule,
    FormsUsuariosRoutingModule,
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
    ConsultarUsuariosComponent,
    FormsUsuariosComponent
  ]
})
export class UsuariosModule { }
