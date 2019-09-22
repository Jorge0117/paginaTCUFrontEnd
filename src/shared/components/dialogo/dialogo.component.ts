import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

// confirmacion, error, afirmacion
export interface DatosDialog {
  mensaje: string;
  tipoMensaje: string;
}

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogoComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: DatosDialog) { }

  ngOnInit() {
  }

  cerrar() {
    this.dialogRef.close();
  }

}
