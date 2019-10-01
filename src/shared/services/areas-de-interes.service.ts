import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AreasDeInteresEntidad} from '../entities/areasDeInteresEntidad';

@Injectable({
  providedIn: 'root'
})
export class AreasDeInteresService {

  private urlEndPoint = environment.backendUrl + '/areasdeinteres';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  consultar(): Observable<AreasDeInteresEntidad[]> {
    return this.http.get<AreasDeInteresEntidad[]>(this.urlEndPoint);
  }

  async consultarArea(id: number): Promise<any> {
    return this.http.get<AreasDeInteresEntidad>(this.urlEndPoint + '/id?id=' + id).toPromise();
  }

  agregar(area: AreasDeInteresEntidad): Observable<AreasDeInteresEntidad> {
    return this.http.post<AreasDeInteresEntidad>(this.urlEndPoint, area, {headers: this.httpHeaders});
  }

  editar(area: AreasDeInteresEntidad): Observable<AreasDeInteresEntidad> {
    return this.http.post<AreasDeInteresEntidad>(this.urlEndPoint + '/editar', area, {headers: this.httpHeaders});
  }

  eliminar(id: number): Observable<AreasDeInteresEntidad> {
    return this.http.delete<AreasDeInteresEntidad>(this.urlEndPoint + '?id=' + id, {headers: this.httpHeaders});
  }
}
