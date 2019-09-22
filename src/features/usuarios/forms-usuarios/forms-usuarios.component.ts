import { Component, OnInit } from '@angular/core';
import {UsuarioEntidad} from '../../../shared/entities/usuarioEntidad';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuariosService} from '../../../shared/services/usuarios.service';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogoComponent} from '../../../shared/components/dialogo/dialogo.component';

@Component({
  selector: 'app-forms-usuarios',
  templateUrl: './forms-usuarios.component.html',
  styleUrls: ['./forms-usuarios.component.css']
})
export class FormsUsuariosComponent implements OnInit {

  private formUsuario: FormGroup;

  // Nombre de la página
  private titulo: string;

  // Usuario a editar/visualizar
  private usuario: UsuarioEntidad;

  // Modo del form
  private modoForm: string;


  constructor(private usuarioService: UsuariosService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.usuario = new UsuarioEntidad();

    this.formUsuario = this.fb.group({
      correo: ['', [
        Validators.required,
        Validators.email
      ]],
      nombre: ['', [
        Validators.required,
        Validators.pattern('[A-Za-záéíóúÁÉÍÓÚ ]*')
      ]],
      apellido1: ['', [
        Validators.required,
        Validators.pattern('[A-Za-záéíóú ]*')
      ]],
      apellido2: ['', [
        Validators.required,
        Validators.pattern('[A-Za-záéíóú ]*')
      ]],
      tipo: ['', [
        Validators.required
      ]]
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar Usuarios';
    } else {

      this.usuarioService.consultarUsuario(this.route.snapshot.params.correo).then(res => {
        this.usuario = res;
        this.formUsuario.controls.correo.setValue(this.usuario.correo);
        this.formUsuario.controls.nombre.setValue(this.usuario.nombre);
        this.formUsuario.controls.apellido1.setValue(this.usuario.apellido1);
        this.formUsuario.controls.apellido2.setValue(this.usuario.apellido2);
        this.formUsuario.controls.tipo.setValue(this.usuario.tipo);
      }, err => {
        this.abrirDialogoError('Error recuperando los datos del usuario.\n' + err.status + '-' + err.statusText);
        this.routeService.navigate(['/usuarios']);
      });

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar Usuarios';
        this.formUsuario.controls.correo.disable();
      } else {
        this.titulo = 'Visualizar Usuarios';
        this.formUsuario.disable();
      }
    }
  }

  get datos() {
    return this.formUsuario.controls;
  }

  private cancelar() {
    this.routeService.navigate(['/usuarios']);
  }

  private agregar() {
    const usuarioNuevo = new UsuarioEntidad();
    usuarioNuevo.correo = this.formUsuario.controls.correo.value;
    usuarioNuevo.nombre = this.formUsuario.controls.nombre.value;
    usuarioNuevo.apellido1 = this.formUsuario.controls.apellido1.value;
    usuarioNuevo.apellido2 = this.formUsuario.controls.apellido2.value;
    usuarioNuevo.contrasenna = '';
    usuarioNuevo.tipo = this.formUsuario.controls.tipo.value;

    this.usuarioService.agregar(usuarioNuevo).subscribe(
      result => {
        this.routeService.navigate(['/usuarios']);
        this.abrirDialogoAfirmacion('Usuario agregado correctamente');
      },
      error => {
        this.abrirDialogoError('Error al agregar usuario, inténtelo de nuevo');
      });
  }

  private editar() {
    const usuarioEditado = new UsuarioEntidad();
    usuarioEditado.correo = this.formUsuario.controls.correo.value;
    usuarioEditado.nombre = this.formUsuario.controls.nombre.value;
    usuarioEditado.apellido1 = this.formUsuario.controls.apellido1.value;
    usuarioEditado.apellido2 = this.formUsuario.controls.apellido2.value;
    usuarioEditado.contrasenna = this.usuario.contrasenna;
    usuarioEditado.tipo = this.formUsuario.controls.tipo.value;

    this.usuarioService.editar(usuarioEditado).subscribe(
      result => {
        this.routeService.navigate(['/usuarios']);
        this.abrirDialogoAfirmacion('Usuario modificado correctamente');
      },
      error => {
        this.abrirDialogoError('Error al modificar usuario, inténtelo de nuevo');
      });
  }

  private abrirDialogoAfirmacion(mensaje: string) {
    const dialogRef = this.dialog.open(DialogoComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'afirmacion'}
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

