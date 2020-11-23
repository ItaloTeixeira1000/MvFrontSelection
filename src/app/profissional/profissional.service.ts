import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { Profissional } from '../core/model';
import { AuthService } from '../seguranca/auth.service';
import { environment } from 'src/environments/environment';

export class ProfissionalFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 2;
}

@Injectable({
  providedIn: 'root',
})
export class ProfissionalService {

  profissionaisUrl: string;

  constructor(public http: HttpClient, private auth: AuthService) {
    this.profissionaisUrl = `${environment.apiUrl}/profissional`;
  }

  listarTodosProfissionais(): Promise<any> {
    return this.http
      .get(`${this.profissionaisUrl}`)
      .toPromise()
      .then((response) => response);
  }

  pesquisar(filtro: ProfissionalFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http
      .get(`${this.profissionaisUrl}`, { params })
      .toPromise()
      .then((response) => {
        const responseJson = JSON.parse(JSON.stringify(response));
        const profissionais = responseJson.content;

        const resultado = {
          profissionais,
          total: responseJson.totalElements,
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http
      .delete(`${this.profissionaisUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(livro: Profissional): Promise<Profissional> {
    return this.http
      .post(this.profissionaisUrl, JSON.stringify(livro))
      .toPromise()
      .then((response) => JSON.parse(JSON.stringify(response)));
  }

  atualizar(livro: Profissional): Promise<Profissional> {
    return this.http
      .put(`${this.profissionaisUrl}/${livro.codigo}`, JSON.stringify(livro))
      .toPromise()
      .then((response) => {
        const livroAlterado = JSON.parse(JSON.stringify(response)) as Profissional;

        return livroAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Profissional> {
    return this.http
      .get(`${this.profissionaisUrl}/${codigo}`)
      .toPromise()
      .then((response) => {
        const livro = JSON.parse(JSON.stringify(response)) as Profissional;
        return livro;
      });
  }

  atualizarToken() {
    if (this.auth.isAccessTokenInvalido()) {
      this.auth.obterNovoAccessToken();
    }
  }
}
