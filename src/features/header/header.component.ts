import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {HostListener} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(public dialog: MatDialog,
              private authService: AuthService) {
    this.getScreenSize();
  }

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

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
}
