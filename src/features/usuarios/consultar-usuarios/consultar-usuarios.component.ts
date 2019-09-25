import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioEntidad} from '../../../shared/entities/usuarioEntidad';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UsuariosService} from '../../../shared/services/usuarios.service';
import {DialogoComponent} from '../../../shared/components/dialogo/dialogo.component';

@Component({
  selector: 'app-consultar-usuarios',
  templateUrl: './consultar-usuarios.component.html',
  styleUrls: ['./consultar-usuarios.component.css']
})
export class ConsultarUsuariosComponent implements OnInit {

  usuarioSeleccionado: UsuarioEntidad;

  usuarios: Array<UsuarioEntidad>;

  public displayedColumns: string[] = ['correo', 'nombre', 'tipo', 'acciones'];

  public dataSource = new MatTableDataSource<UsuarioEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private usuariosService: UsuariosService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarUsuarios();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarUsuarios() {
    this.usuariosService.consultar().subscribe(
      usuarios => {
        this.dataSource.data = usuarios as UsuarioEntidad[];
        this.usuarios = this.dataSource.data;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(correo: string) {
    this.usuariosService.eliminar(correo).subscribe(
      res => {
        this.consultarUsuarios();
        this.abrirDialogoAfirmacion('Usuario eliminado correctamente');
      },
      error => {
        this.abrirDialogoError('Error al eliminar usuario.\n' + error.status + '-' + error.statusText);
      });
  }

  private abrirDialogoConfirmacion(cedula: string) {
    const dialogRef = this.dialog.open(DialogoComponent,
      {
        width: '350px',
        data: {mensaje: '¿Seguro que desea eliminar el usuario?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(cedula);
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
