import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AreasDeInteresEntidad} from '../../../shared/entities/areasDeInteresEntidad';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AreasDeInteresService} from '../../../shared/services/areas-de-interes.service';
import {DialogoComponent} from '../../../shared/components/dialogo/dialogo.component';

@Component({
  selector: 'app-forms-areas-de-interes',
  templateUrl: './forms-areas-de-interes.component.html',
  styleUrls: ['./forms-areas-de-interes.component.css']
})
export class FormsAreasDeInteresComponent implements OnInit {

  private formAreas: FormGroup;

  // Nombre de la página
  private titulo: string;

  // Usuario a editar/visualizar
  private area: AreasDeInteresEntidad;

  // Modo del form
  private modoForm: string;

  uploadResponse;

  ubicacionImagen;

  constructor(private areaService: AreasDeInteresService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.area = new AreasDeInteresEntidad();

    this.formAreas = this.fb.group({
      esp_nombre: ['', [
        Validators.required
      ]],
      ing_nombre: ['', [
        Validators.required
      ]],
      foto: ['']
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar áreas de interés';
    } else {

      this.areaService.consultarArea(this.route.snapshot.params.id).then(res => {
        this.area = res;
        this.formAreas.controls.esp_nombre.setValue(this.area.esp_nombre);
        this.formAreas.controls.ing_nombre.setValue(this.area.ing_nombre);
        this.ubicacionImagen = this.area.ubicacion_imagen;
      }, err => {
        this.abrirDialogoError('Error recuperando los datos del área de interés.\n' + err.status + '-' + err.statusText);
        this.routeService.navigate(['/areasdeinteres']);
      });

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar áreas de interés';
      } else {
        this.titulo = 'Visualizar áreas de interés';
        this.formAreas.disable();
      }
    }
  }

  get datos() {
    return this.formAreas.controls;
  }

  private cancelar() {
    this.routeService.navigate(['/areasdeinteres']);
  }

  private agregar() {
    const areaNueva = new AreasDeInteresEntidad();
    areaNueva.id = 0;
    areaNueva.esp_nombre = this.formAreas.controls.esp_nombre.value;
    areaNueva.ing_nombre = this.formAreas.controls.ing_nombre.value;
    areaNueva.ubicacion_imagen = '';

    this.areaService.agregar(areaNueva).subscribe(
      result => {
        this.routeService.navigate(['/areasdeinteres']);
        this.abrirDialogoAfirmacion('Área de interés agregado correctamente');
      },
      error => {
        this.abrirDialogoError('Error al agregar área de interés.\n' + error.status + '-' + error.statusText);
      });
  }

  private editar() {
    const areaEditada = new AreasDeInteresEntidad();
    areaEditada.id = this.area.id;
    areaEditada.esp_nombre = this.formAreas.controls.esp_nombre.value;
    areaEditada.ing_nombre = this.formAreas.controls.ing_nombre.value;
    areaEditada.ubicacion_imagen = '';

    this.areaService.editar(areaEditada).subscribe(
      result => {
        this.routeService.navigate(['/areasdeinteres']);
        this.abrirDialogoAfirmacion('Área de interés modificado correctamente');
      },
      error => {
        this.abrirDialogoError('Error al modificar área de interés.\n' + error.status + '-' + error.statusText);
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

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formAreas.controls.archivo.setValue(file);
    }
  }
}
