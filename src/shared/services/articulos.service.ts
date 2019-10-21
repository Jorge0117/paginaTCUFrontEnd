import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArticulosEntidad} from '../entities/articulosEntidad';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private urlEndPoint = environment.backendUrl + '/articulos';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(idArea: number): Observable<ArticulosEntidad[]> {
    return this.http.get<ArticulosEntidad[]>(this.urlEndPoint + '/area?area=' + idArea);
  }
}
