import {Component, OnInit, ViewChild} from '@angular/core';
import {AreasDeInteresEntidad} from '../../../shared/entities/areasDeInteresEntidad';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ArticulosEntidad} from '../../../shared/entities/articulosEntidad';
import {AreasDeInteresService} from '../../../shared/services/areas-de-interes.service';
import {FileService} from '../../../shared/services/files.service';
import {environment} from '../../../environments/environment';
import {ArticulosService} from '../../../shared/services/articulos.service';
import {ActivatedRoute} from '@angular/router';
import {DialogoComponent} from '../../../shared/components/dialogo/dialogo.component';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-consultar-articulos',
  templateUrl: './consultar-articulos.component.html',
  styleUrls: ['./consultar-articulos.component.css']
})
export class ConsultarArticulosComponent implements OnInit {

  areas: Array<ArticulosEntidad>;
  private backendUrl: string;

  public displayedColumns: string[] = ['imagen', 'esp_titulo', 'correo_usuario'];

  public dataSource = new MatTableDataSource<ArticulosEntidad>();
  idArea: number;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private articulosService: ArticulosService,
              public dialog: MatDialog,
              private fileService: FileService,
              private route: ActivatedRoute,
              private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      this.displayedColumns.push('acciones');
    }
  }

  ngOnInit() {
    this.backendUrl = environment.backendUrl;
    this.idArea = this.route.snapshot.params.idArea;
    this.consultarArticulos();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarArticulos() {
    this.articulosService.consultar(this.idArea).subscribe(
      articulos => {
        this.dataSource.data = articulos as ArticulosEntidad[];
        this.areas = this.dataSource.data;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(id: number) {
    /*
    this.areasDeInteresService.eliminar(id).subscribe(
      res => {
        this.consultarAreas();
        this.abrirDialogoAfirmacion('Área de interés eliminada correctamente');
      },
      error => {
        this.abrirDialogoError('Error al eliminar usuario.\n' + error.status + '-' + error.statusText);
      });

     */
  }

  private abrirDialogoConfirmacion(id: number) {
    const dialogRef = this.dialog.open(DialogoComponent,
      {
        width: '350px',
        data: {mensaje: '¿Seguro que desea eliminar el área de interés?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(id);
      }
    });
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }
  private abrirDialogoAfirmacion(mensaje: string) {
    const dialogRef = this.dialog.open(DialogoComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'afirmacion'}
      });
  }

  private descargarImagen(area: AreasDeInteresEntidad) {
    this.fileService.descargarImagen(area.ubicacion_imagen).subscribe(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        area.url_imagen = reader.result;
      };

    }, err => {
      area.url_imagen = '../../../assets/images/100.png';
    });
  }
}
