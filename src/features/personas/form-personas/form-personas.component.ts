import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../../shared/services/usuarios.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {PersonasService} from '../../../shared/services/personas.service';
import {UsuarioEntidad} from '../../../shared/entities/usuarioEntidad';
import {PersonaEntidad} from '../../../shared/entities/personaEntidad';
import {DialogoComponent} from '../../../shared/components/dialogo/dialogo.component';

@Component({
  selector: 'app-form-personas',
  templateUrl: './form-personas.component.html',
  styleUrls: ['./form-personas.component.css']
})
export class FormPersonasComponent implements OnInit {

  private formPersonas: FormGroup;

  // Nombre de la página
  private titulo: string;

  // Usuario a editar/visualizar
  private persona: PersonaEntidad;
  private tipoPersona: string;

  // Modo del form
  private modoForm: string;

  constructor(private personasService: PersonasService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.persona = new PersonaEntidad();
    this.tipoPersona = this.route.snapshot.params.tipo;

    this.formPersonas = this.fb.group({
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
      tipo: [this.tipoPersona, [
        Validators.required
      ]],
      escuela: ['', [
        Validators.required
      ]],
      informacion_adicional: ['', [
        Validators.required,
        Validators.maxLength(600)
      ]]
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar Personas';
    } else {

      this.personasService.consultarPersona(this.route.snapshot.params.correo).then(res => {
        this.persona = res;
        this.formPersonas.controls.correo.setValue(this.persona.correo);
        this.formPersonas.controls.nombre.setValue(this.persona.nombre);
        this.formPersonas.controls.apellido1.setValue(this.persona.apellido1);
        this.formPersonas.controls.apellido2.setValue(this.persona.apellido2);
        this.formPersonas.controls.tipo.setValue(this.persona.tipo);
        this.formPersonas.controls.escuela.setValue(this.persona.escuela);
        this.formPersonas.controls.informacion_adicional.setValue(this.persona.informacion_adicional);
      }, err => {
        this.abrirDialogoError('Error recuperando los datos de la persona.\n' + err.status + '-' + err.statusText);
        this.routeService.navigate(['/personas']);
      });

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar Personas';
        this.formPersonas.controls.correo.disable();
      } else {
        this.titulo = 'Visualizar Personas';
        this.formPersonas.disable();
      }
    }
  }

  get datos() {
    return this.formPersonas.controls;
  }

  private cancelar() {
    this.routeService.navigate(['/personas/' + this.route.snapshot.params.tipo]);
  }

  private agregar() {
    const personaNueva = new PersonaEntidad();
    personaNueva.correo = this.formPersonas.controls.correo.value;
    personaNueva.nombre = this.formPersonas.controls.nombre.value;
    personaNueva.apellido1 = this.formPersonas.controls.apellido1.value;
    personaNueva.apellido2 = this.formPersonas.controls.apellido2.value;
    personaNueva.tipo = this.formPersonas.controls.tipo.value;
    personaNueva.escuela = this.formPersonas.controls.escuela.value;
    personaNueva.informacion_adicional = this.formPersonas.controls.informacion_adicional.value;

    this.personasService.agregar(personaNueva).subscribe(
      result => {
        this.routeService.navigate(['/personas/' + this.tipoPersona]);
        this.abrirDialogoAfirmacion('Persona agregado correctamente');
      },
      error => {
        this.abrirDialogoError('Error al agregar persona.\n' + error.status + '-' + error.statusText);
      });
  }

  private editar() {
    const personaEditada = new PersonaEntidad();
    personaEditada.correo = this.formPersonas.controls.correo.value;
    personaEditada.nombre = this.formPersonas.controls.nombre.value;
    personaEditada.apellido1 = this.formPersonas.controls.apellido1.value;
    personaEditada.apellido2 = this.formPersonas.controls.apellido2.value;
    personaEditada.tipo = this.formPersonas.controls.tipo.value;
    personaEditada.escuela = this.formPersonas.controls.escuela.value;
    personaEditada.informacion_adicional = this.formPersonas.controls.informacion_adicional.value;

    this.personasService.editar(personaEditada).subscribe(
      result => {
        this.routeService.navigate(['/personas/' + this.route.snapshot.params.tipo]);
        this.abrirDialogoAfirmacion('Persona modificada correctamente');
      },
      error => {
        this.abrirDialogoError('Error al modificar persona.\n' + error.status + '-' + error.statusText);
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
