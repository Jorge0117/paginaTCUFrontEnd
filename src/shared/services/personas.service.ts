import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PersonaEntidad} from '../entities/personaEntidad';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private urlEndPoint = environment.backendUrl + '/personas';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(tipo: string): Observable<PersonaEntidad[]> {
    return this.http.get<PersonaEntidad[]>(this.urlEndPoint + '/?tipo=' + tipo);
  }

  async consultarPersona(correo: string): Promise<any> {
    return this.http.get<PersonaEntidad>(this.urlEndPoint + '/id?correo=' + correo).toPromise();
  }

  agregar(usuario: PersonaEntidad): Observable<PersonaEntidad> {
    return this.http.post<PersonaEntidad>(this.urlEndPoint, usuario, {headers: this.httpHeaders});
  }

  editar(usuario: PersonaEntidad): Observable<PersonaEntidad> {
    return this.http.post<PersonaEntidad>(this.urlEndPoint + '/editar', usuario, {headers: this.httpHeaders});
  }

  eliminar(correo: string): Observable<PersonaEntidad> {
    return this.http.delete<PersonaEntidad>(this.urlEndPoint + '?correo=' + correo, {headers: this.httpHeaders});
  }
}
