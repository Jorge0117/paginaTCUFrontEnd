import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/internal/operators/first';
import {DatosDialog} from '../../shared/components/dialogo/dialogo.component';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  error: string;
  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: DatosDialog,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {

    if (this.authService.isLoggedIn()) {
      this.cerrarDialogo();
    }
  }

  ngOnInit() {
    this.formLogin = this.fb.group({
      correo: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  get correo() {
    return this.formLogin.controls.correo;
  }
  get password() {
    return this.formLogin.controls.password;
  }

  private cerrarDialogo() {
    this.dialogRef.close();
  }

  login() {
    this.submitted = true;
    this.loading = true;
    const user = {correo: this.correo.value, contrasenna: this.password.value};
    this.authService.login(user)
      .subscribe(
        success => {
          if (success) {
            this.dialogRef.close();
          } else {
            this.loading = false;
          }
        }
      );
  }

}
