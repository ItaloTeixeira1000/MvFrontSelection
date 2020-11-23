import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  oauthTokenUrl: string;
  tokensRevokeUrl: string;
  jwtPayload: any;

  auth = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YW5ndWxhcjpAbmd1bEByMA=='
    );
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http
      .post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((response) => {
        this.armazenarToken(JSON.parse(JSON.stringify(response)).access_token);
      })
      .catch((response) => {
        if (response.status === 400) {
          const responseJson = JSON.parse(JSON.stringify(response));

          if (responseJson.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida');
          }
        }

        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YW5ndWxhcjpAbmd1bEByMA=='
    );
    const body = 'grant_type=refresh_token';

    return this.http
      .post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((response) => {
        this.armazenarToken(JSON.parse(JSON.stringify(response)).access_token);

        console.log('Novo access token criado');

        return Promise.resolve(null);
      })
      .catch((response) => {
        console.log('Erro ao renovar token ', response);
        return Promise.resolve(null);
      });
  }

  logout() {
    return this.http
      .delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.limparAccessToken();
      });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.auth.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.auth.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
