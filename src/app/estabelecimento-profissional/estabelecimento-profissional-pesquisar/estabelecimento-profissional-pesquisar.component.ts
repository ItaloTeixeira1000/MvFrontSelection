import { LazyLoadEvent } from 'primeng/api/public_api';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { EstabelecimentoProfissionalService, EstabelecimentoProfissonalFiltro } from '../estabelecimento-profissional.service';

@Component({
  selector: 'app-estabelecimento-profissional-pesquisar',
  templateUrl: './estabelecimento-profissional-pesquisar.component.html',
  styleUrls: ['./estabelecimento-profissional-pesquisar.component.css']
})
export class EstabelecimentoProfissionalPesquisarComponent implements OnInit {

  totalRegistros = 0;
  estabelecimentosProfissionais = [];
  filtro = new EstabelecimentoProfissonalFiltro();

  constructor(
    private eps: EstabelecimentoProfissionalService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.eps.pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total;
        this.estabelecimentosProfissionais = resultado.estabelecimentosP;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

}
