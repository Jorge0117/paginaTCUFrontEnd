import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {InicioModule} from '../features/inicio/inicio.module';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderModule} from '../features/header/header.module';
import {MatSidenavModule} from '@angular/material';
import {SidenavModule} from '../features/sidenav/sidenav.module';
import {UsuariosModule} from '../features/usuarios/usuarios.module';
import {DialogoModule} from '../shared/components/dialogo/dialogo.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    InicioModule,
    RouterModule,
    BrowserAnimationsModule,
    HeaderModule,
    SidenavModule,
    UsuariosModule,
    DialogoModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
