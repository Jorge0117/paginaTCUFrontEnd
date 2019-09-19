import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import {RouterModule} from '@angular/router';
import {InicioRoutingModule} from './inicio-routing.module';
import {MatButtonModule, MatCardModule, MatDividerModule} from '@angular/material';

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
    MatButtonModule
  ],
  exports: [
    InicioComponent
  ]
})
export class InicioModule { }
