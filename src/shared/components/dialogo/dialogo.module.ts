import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatDialogModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {DialogoComponent} from './dialogo.component';



@NgModule({
  declarations: [
    DialogoComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  entryComponents: [
    DialogoComponent
  ]
})
export class DialogoModule { }
