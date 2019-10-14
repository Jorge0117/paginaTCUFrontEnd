import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private urlEndPoint = environment.backendUrl + '/upload';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private httpClient: HttpClient) { }

  subirDocumento(documento, folder: string): Observable<any> {
    return this.httpClient.post<any>(`${this.urlEndPoint}/document?folder=` + folder, documento);
  }

  subirImagen(imagen, folder: string): Observable<any> {
    return this.httpClient.post<any>(`${this.urlEndPoint}/image?folder=` + folder, imagen);
  }

  descargar(url: string): Observable<any> {
    return this.httpClient.get(environment.backendUrl + '/download?url=' + url,
      {headers: this.httpHeaders, responseType: 'blob' as 'json'});
  }
}
