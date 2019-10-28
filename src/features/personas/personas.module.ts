import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {ConsultarPersonasComponent} from './consultar-personas/consultar-personas.component';
import {FormPersonasComponent} from './form-personas/form-personas.component';
import {ConsultarPersonasRoutingModule} from './consultar-personas/consultar-personas-routing.module';
import {FormPersonasRoutingModule} from './form-personas/form-personas-routing.module';



@NgModule({
  declarations: [
    ConsultarPersonasComponent,
    FormPersonasComponent
  ],
  imports: [
    CommonModule,
    ConsultarPersonasRoutingModule,
    FormPersonasRoutingModule,
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
    ConsultarPersonasComponent,
    FormPersonasComponent
  ]
})
export class PersonasModule { }
