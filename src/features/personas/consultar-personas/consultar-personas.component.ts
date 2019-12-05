import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PersonaEntidad} from '../../../shared/entities/personaEntidad';
import {PersonasService} from '../../../shared/services/personas.service';
import {ActivatedRoute} from '@angular/router';
import {DialogoComponent} from '../../../shared/components/dialogo/dialogo.component';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-consultar-personas',
  templateUrl: './consultar-personas.component.html',
  styleUrls: ['./consultar-personas.component.css']
})
export class ConsultarPersonasComponent implements OnInit {

  personas: Array<PersonaEntidad>;

  public displayedColumns: string[] = ['nombre', 'correo', 'escuela', 'informacion_adicional'];

  public dataSource = new MatTableDataSource<PersonaEntidad>();
  private tipoPersonas: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private personasService: PersonasService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      this.displayedColumns.push('acciones');
    }
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.tipoPersonas = this.route.snapshot.params.tipo;
        this.consultarPersonas(this.tipoPersonas);
      }
    );

    this.tipoPersonas = this.route.snapshot.params.tipo;
    this.consultarPersonas(this.tipoPersonas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarPersonas(tipo: string) {
    this.personasService.consultar(tipo).subscribe(
      personas => {
        this.dataSource.data = personas as PersonaEntidad[];
        this.personas = this.dataSource.data;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(correo: string) {
    this.personasService.eliminar(correo).subscribe(
      res => {
        this.consultarPersonas(this.tipoPersonas);
        this.abrirDialogoAfirmacion('Persona eliminada correctamente');
      },
      error => {
        this.abrirDialogoError('Error al eliminar persona.\n' + error.status + '-' + error.statusText);
      });
  }

  private abrirDialogoConfirmacion(correo: string) {
    const dialogRef = this.dialog.open(DialogoComponent,
      {
        width: '350px',
        data: {mensaje: '¿Seguro que desea eliminar la persona?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(correo);
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
