import { Component, OnInit } from '@angular/core';
import {AreasDeInteresService} from '../../shared/services/areas-de-interes.service';
import {AreasDeInteresEntidad} from '../../shared/entities/areasDeInteresEntidad';
import {DialogoComponent} from '../../shared/components/dialogo/dialogo.component';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../shared/services/auth.service';
import {FileService} from '../../shared/services/files.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  private areasDeInteres: AreasDeInteresEntidad[];
  constructor(private areasDeInteresService: AreasDeInteresService,
              private dialog: MatDialog,
              private authService: AuthService,
              private fileService: FileService) { }

  ngOnInit() {
    this.consultarAreasDeInteres();
  }

  consultarAreasDeInteres() {
    this.areasDeInteresService.consultar().subscribe(res => {
      this.areasDeInteres = res;
      for (const area of this.areasDeInteres) {
        this.descargarImagen(area);
      }
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

  private descargarImagen(area: AreasDeInteresEntidad) {
    this.fileService.descargarImagen(area.ubicacion_imagen).subscribe(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // area.url_imagen = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + reader.result);
        area.url_imagen = reader.result;
      };

    }, err => {
      area.url_imagen = '../../../assets/images/100.png';
    });
  }
}
