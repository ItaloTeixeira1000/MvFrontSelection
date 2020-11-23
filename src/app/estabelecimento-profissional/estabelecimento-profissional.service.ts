import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { FornecedorFiltro } from '../estabelecimento/estabelecimento.service';
import { HttpClient, HttpParams } from '@angular/common/http';

export class EstabelecimentoProfissonalFiltro {
  pagina = 0;
  itensPorPagina = 2;
}

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoProfissionalService {

  epf: string;
  constructor(private http: HttpClient) {
    this.epf = `${environment.apiUrl}/estabelecimento-profissional`;
   }

  pesquisar(filtro: EstabelecimentoProfissonalFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());


    return this.http
      .get(`${this.epf}`, { params })
      .toPromise()
      .then((response) => {
        const responseJson = JSON.parse(JSON.stringify(response));
        const estabelecimentosP = responseJson.content;

        const resultado = {
          estabelecimentosP,
          total: responseJson.totalElements,
        };
        return resultado;
      });
  }
}
