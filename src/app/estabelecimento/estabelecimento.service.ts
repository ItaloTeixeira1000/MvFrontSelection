import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Estabelecimento } from '../core/model';

export class FornecedorFiltro {
  nome: string;
  codigo: any;
  pagina = 0;
  itensPorPagina = 2;
}

@Injectable({
  providedIn: 'root',
})
export class EstabelecimentoService {

  estabelecimento: string;

  constructor(private http: HttpClient) {
    this.estabelecimento = `${environment.apiUrl}/estabelecimento`;
  }

  listarTodosEstabelecimentos(): Promise<any> {
    return this.http
      .get(`${this.estabelecimento}`)
      .toPromise()
      .then((response) => response);
  }

  pesquisar(filtro: FornecedorFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    if (filtro.codigo) {
      params = params.set('codigo', filtro.codigo.toString());
    }

    return this.http
      .get(`${this.estabelecimento}`, { params })
      .toPromise()
      .then((response) => {
        const responseJson = JSON.parse(JSON.stringify(response));
        const estabelecimentos = responseJson.content;

        const resultado = {
          estabelecimentos,
          total: responseJson.totalElements,
        };
        return resultado;
      });
  }

  excluir(codigo: any): Promise<void> {
    return this.http
      .delete(`${this.estabelecimento}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, status: boolean): Promise<void> {
    return this.http
      .put(`${this.estabelecimento}/${codigo}/ativo`, status)
      .toPromise()
      .then(() => null);
  }

  listarTodosFornecedores(): Promise<any> {
    return this.http
      .get(`${this.estabelecimento}`)
      .toPromise()
      .then((response) => response);
  }

  adicionar(fornecedor: Estabelecimento): Promise<Estabelecimento> {
    return this.http
      .post(this.estabelecimento, JSON.stringify(fornecedor))
      .toPromise()
      .then((response) => JSON.parse(JSON.stringify(response)));
  }

  atualizar(fornecedor: Estabelecimento): Promise<Estabelecimento> {
    return this.http
      .put(
        `${this.estabelecimento}/${fornecedor.codigo}`,
        JSON.stringify(fornecedor)
      )
      .toPromise()
      .then((response) => JSON.parse(JSON.stringify(response)) as Estabelecimento);
  }

  buscarPorCodigo(codigo: number): Promise<Estabelecimento> {
    return this.http
      .get(`${this.estabelecimento}/${codigo}`)
      .toPromise()
      .then((response) => JSON.parse(JSON.stringify(response)) as Estabelecimento);
  }
}
