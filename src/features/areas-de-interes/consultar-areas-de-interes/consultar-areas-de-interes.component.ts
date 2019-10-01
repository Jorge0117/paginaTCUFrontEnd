import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AreasDeInteresEntidad} from '../../../shared/entities/areasDeInteresEntidad';
import {AreasDeInteresService} from '../../../shared/services/areas-de-interes.service';
import {DialogoComponent} from '../../../shared/components/dialogo/dialogo.component';

@Component({
  selector: 'app-consultar-areas-de-interes',
  templateUrl: './consultar-areas-de-interes.component.html',
  styleUrls: ['./consultar-areas-de-interes.component.css']
})
export class ConsultarAreasDeInteresComponent implements OnInit {

  areas: Array<AreasDeInteresEntidad>;

  public displayedColumns: string[] = ['imagen', 'esp_nombre', 'ing_nombre', 'acciones'];

  public dataSource = new MatTableDataSource<AreasDeInteresEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private areasDeInteresService: AreasDeInteresService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarAreas();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarAreas() {
    this.areasDeInteresService.consultar().subscribe(
      areas => {
        this.dataSource.data = areas as AreasDeInteresEntidad[];
        this.areas = this.dataSource.data;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(id: number) {
    this.areasDeInteresService.eliminar(id).subscribe(
      res => {
        this.consultarAreas();
        this.abrirDialogoAfirmacion('Área de interés eliminada correctamente');
      },
      error => {
        this.abrirDialogoError('Error al eliminar usuario.\n' + error.status + '-' + error.statusText);
      });
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
}
