import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {HostListener} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;

  @Output() public sidenavToggle = new EventEmitter();

  constructor() {
    this.getScreenSize();
  }

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

}
