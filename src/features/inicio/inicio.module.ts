import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import {RouterModule} from '@angular/router';
import {InicioRoutingModule} from './inicio-routing.module';
import {MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule} from '@angular/material';

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InicioRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    InicioComponent
  ]
})
export class InicioModule { }
