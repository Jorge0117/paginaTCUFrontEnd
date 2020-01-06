import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticulosEntidad} from '../../../shared/entities/articulosEntidad';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {FileService} from '../../../shared/services/files.service';
import {ArticulosService} from '../../../shared/services/articulos.service';
import {DialogoComponent} from '../../../shared/components/dialogo/dialogo.component';
import {EditorInstance, EditorOption} from 'angular-markdown-editor';
import {MarkdownService} from 'ngx-markdown';
import {AuthService} from '../../../shared/services/auth.service';
import {UsuariosService} from '../../../shared/services/usuarios.service';


@Component({
  selector: 'app-form-articulos',
  templateUrl: './form-articulos.component.html',
  styleUrls: ['./form-articulos.component.css']
})
export class FormArticulosComponent implements OnInit {

  private formArticulo: FormGroup;

  // Nombre de la página
  private titulo: string;

  // Usuario a editar/visualizar
  private articulo: ArticulosEntidad;

  // Modo del form
  private modoForm: string;

  private idArea;
  private nombreAutor;
  uploadResponse;

  ubicacionImagen;

  bsEditorInstance: EditorInstance;
  editorOptions: EditorOption;
  markdownText: string;


  constructor(private articulosService: ArticulosService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private fileService: FileService,
              private markdownService: MarkdownService,
              private usuarioService: UsuariosService,
              private authService: AuthService) { }

  ngOnInit() {

    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      onShow: (e) => this.bsEditorInstance = e,
      parser: (val) => this.parse(val)
    };

    this.modoForm = this.route.snapshot.params.modo;
    this.idArea = this.route.snapshot.params.area;
    this.articulo = new ArticulosEntidad();

    this.formArticulo = this.fb.group({
      esp_titulo: ['', [
        Validators.required
      ]],

      foto: ['']
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar artículo';
    } else {

      this.articulosService.consultarArticulo(this.route.snapshot.params.id).then(res => {
        this.articulo = res;
        this.descargarImagen(this.articulo);
        this.consultarAutor();
        this.formArticulo.controls.esp_titulo.setValue(this.articulo.esp_titulo);
        this.formArticulo.controls.foto.setValue(this.articulo.ubicacion_thumbnail);
        this.ubicacionImagen = this.articulo.ubicacion_thumbnail;
      }, err => {
        this.abrirDialogoError('Error recuperando los datos del artículo.\n' + err.status + '-' + err.statusText);
        this.routeService.navigate(['/articulos/' + this.idArea]);
      });

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar artículo';
      } else {
        this.titulo = 'Visualizar artículo';
        this.formArticulo.disable();
      }
    }
  }

  get datos() {
    return this.formArticulo.controls;
  }

  private cancelar() {
    this.routeService.navigate(['/articulos/' + this.idArea]);
  }

  private agregar() {
    if (this.formArticulo.get('foto').value !== '') {
      const formData = new FormData();
      formData.append('archivo', this.formArticulo.get('foto').value);

      this.fileService.subirImagen(formData, 'articulos').subscribe(
        (res) => {
          this.uploadResponse = res.url;
          console.log(this.uploadResponse.substring(this.uploadResponse.indexOf('files')));
          this.uploadResponse = this.uploadResponse.substring(this.uploadResponse.indexOf('files\\'));
          this.agregarArticulo();
        },
        (err) => {
          this.uploadResponse = 'error';
          this.abrirDialogoError('Ha ocurrido un error subiendo el archivo');
        }
      );
    } else {
      this.uploadResponse = '';
      this.agregarArticulo();
    }
  }

  private agregarArticulo() {
    const articuloNuevo = new ArticulosEntidad();
    articuloNuevo.id = 0;
    articuloNuevo.esp_titulo = this.formArticulo.controls.esp_titulo.value;
    articuloNuevo.esp_cuerpo = this.markdownText;
    articuloNuevo.ubicacion_thumbnail = this.uploadResponse;
    articuloNuevo.id_area_interes = this.route.snapshot.params.area;
    articuloNuevo.fecha = new Date();
    articuloNuevo.ing_titulo = '';
    articuloNuevo.ing_cuerpo = '';
    articuloNuevo.correo_usuario = this.authService.getCorreo();

    this.articulosService.agregar(articuloNuevo).subscribe(
      result => {
        this.routeService.navigate(['/articulos/' + this.idArea]);
        this.abrirDialogoAfirmacion('Artículo agregado correctamente');
      },
      error => {
        this.abrirDialogoError('Error al agregar Artículo.\n' + error.status + '-' + error.statusText);
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
      this.formArticulo.controls.foto.setValue(file);
    }
  }

  parse(inputValue: string) {
    const markedOutput = this.markdownService.compile(inputValue.trim());

    return markedOutput;
  }

  private descargarImagen(articulo: ArticulosEntidad) {
    this.fileService.descargarImagen(articulo.ubicacion_thumbnail).subscribe(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        articulo.url_imagen = reader.result;
      };

    }, err => {
      articulo.url_imagen = '../../../assets/images/100.png';
    });
  }

  private consultarAutor() {
    this.usuarioService.consultarUsuario(this.articulo.correo_usuario).then(res => {
      this.nombreAutor = res.nombre + ' ' + res.apellido1 + ' ' + res.apellido2;
    });
  }
}
