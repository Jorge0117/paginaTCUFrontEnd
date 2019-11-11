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
import {FormArticulosRoutingModule} from './form-articulos/form-articulos-routing-module';
import {AngularMarkdownEditorModule} from 'angular-markdown-editor';
import {MarkdownModule, MarkedOptions, MarkedRenderer} from 'ngx-markdown';



@NgModule({
  declarations: [
    ConsultarArticulosComponent,
    FormArticulosComponent
  ],
  imports: [
    CommonModule,
    ConsultarArticulosRoutingModule,
    FormArticulosRoutingModule,
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
    MatSelectModule,
    AngularMarkdownEditorModule.forRoot({
      // add any Global Options/Config you might want
      // to avoid passing the same options over and over in each components of your App
      iconlibrary: 'glyph'
    }),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          renderer: new MarkedRenderer(),
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
  ],
  exports: [
    ConsultarArticulosComponent,
    FormArticulosComponent
  ]
})
export class ArticulosModule { }
