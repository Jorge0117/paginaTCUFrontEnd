import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidenavComponent} from './sidenav.component';
import {MatButtonModule, MatListModule, MatMenuModule} from '@angular/material';

@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule { }
