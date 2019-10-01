import { Component, OnInit } from '@angular/core';
import {AreasDeInteresService} from '../../shared/services/areas-de-interes.service';
import {AreasDeInteresEntidad} from '../../shared/entities/areasDeInteresEntidad';
import {DialogoComponent} from '../../shared/components/dialogo/dialogo.component';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  private areasDeInteres: AreasDeInteresEntidad[];
  constructor(private areasDeInteresService: AreasDeInteresService,
              private dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit() {
    this.consultarAreasDeInteres();
  }

  consultarAreasDeInteres() {
    this.areasDeInteresService.consultar().subscribe(res => {
      this.areasDeInteres = res;
    }, err => {
      this.abrirDialogoError('Ha ocurrido un error consultando las áreas de interés.\n' + err.status + '-' + err.statusText);
    });
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }
}
