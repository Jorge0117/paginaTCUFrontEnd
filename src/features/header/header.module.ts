import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header.component';
import {MatIconModule, MatToolbarModule, MatButtonModule, MatMenuModule} from '@angular/material';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
