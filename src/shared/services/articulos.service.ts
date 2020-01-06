import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArticulosEntidad} from '../entities/articulosEntidad';
import {AreasDeInteresEntidad} from '../entities/areasDeInteresEntidad';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private urlEndPoint = environment.backendUrl + '/articulos';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(idArticulo: number): Observable<ArticulosEntidad[]> {
    return this.http.get<ArticulosEntidad[]>(this.urlEndPoint + '/area?area=' + idArticulo);
  }

  agregar(articulo: ArticulosEntidad): Observable<ArticulosEntidad> {
    return this.http.post<ArticulosEntidad>(this.urlEndPoint, articulo, {headers: this.httpHeaders});
  }

  async consultarArticulo(idArticulo: number): Promise<any> {
    return this.http.get<ArticulosEntidad>(this.urlEndPoint + '/id?id=' + idArticulo).toPromise();
  }
}
