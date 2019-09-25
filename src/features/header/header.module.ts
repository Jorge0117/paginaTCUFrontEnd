import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header.component';
import {MatIconModule, MatToolbarModule, MatButtonModule, MatMenuModule, MatDialogModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatDialogModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
