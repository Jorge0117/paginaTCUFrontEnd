import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {HostListener} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {AuthService} from '../../shared/services/auth.service';
import {AreasDeInteresService} from '../../shared/services/areas-de-interes.service';
import {AreasDeInteresEntidad} from '../../shared/entities/areasDeInteresEntidad';
import {DialogoComponent} from '../../shared/components/dialogo/dialogo.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;
  areasDeInteres: AreasDeInteresEntidad[];

  @Output() public sidenavToggle = new EventEmitter();

  constructor(public dialog: MatDialog,
              private authService: AuthService,
              private areasDeInteresService: AreasDeInteresService) {
    this.getScreenSize();
  }

  ngOnInit() {
    this.consultarAreasDeInteres();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  private abrirLogin() {
    this.dialog.open(LoginComponent,
      {
        width: '700px',
        data: ''
      });
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
