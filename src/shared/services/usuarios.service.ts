import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UsuarioEntidad} from '../entities/usuarioEntidad';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlEndPoint = environment.backendUrl + '/usuarios';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<UsuarioEntidad[]> {
    return this.http.get<UsuarioEntidad[]>(this.urlEndPoint);
  }

  async consultarUsuario(cedula: string): Promise<any> {
    return this.http.get<UsuarioEntidad>(this.urlEndPoint + '/id?correo=' + cedula).toPromise();
  }

  agregar(usuario: UsuarioEntidad): Observable<UsuarioEntidad> {
    return this.http.post<UsuarioEntidad>(this.urlEndPoint, usuario, {headers: this.httpHeaders});
  }

  editar(usuario: UsuarioEntidad): Observable<UsuarioEntidad> {
    return this.http.post<UsuarioEntidad>(this.urlEndPoint + '/editar', usuario, {headers: this.httpHeaders});
  }

  eliminar(correo: string): Observable<UsuarioEntidad> {
    return this.http.delete<UsuarioEntidad>(this.urlEndPoint + '?correo=' + correo, {headers: this.httpHeaders});
  }
}
