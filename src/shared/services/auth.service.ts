import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {catchError, mapTo} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {environment} from '../../environments/environment';
import {Tokens} from '../entities/tokens';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient,
              private routeService: Router) {}

  login(user: { correo: string, contrasenna: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.backendUrl}/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.correo, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() {
    /*
    return this.http.post<any>(`${environment.backendUrl}/logout`, {
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));

     */
    this.removeTokens();
    this.routeService.navigate(['/']);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${environment.backendUrl}/login/refresh`, {
      refreshToken: this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  public getNombreCompleto() {
    const datosToken = jwt_decode(localStorage.getItem('JWT_TOKEN'));
    return datosToken.identity.nombre + ' ' + datosToken.identity.apellido1 + ' ' + datosToken.identity.apellido2;
  }
}
