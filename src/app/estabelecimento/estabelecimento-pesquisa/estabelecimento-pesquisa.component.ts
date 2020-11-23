import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api/public_api';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

import { FornecedorFiltro, EstabelecimentoService } from './../estabelecimento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-fornecedor-pesquisa',
  templateUrl: './estabelecimento-pesquisa.component.html',
  styleUrls: ['./estabelecimento-pesquisa.component.css'],
})
export class EstabelecimentoPesquisaComponent implements OnInit {
  @ViewChild('tabela', { static: false }) grid;

  totalRegistros = 0;
  filtro = new FornecedorFiltro();
  estabelecimentos = [];

  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private toastr: ToastrService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) {
  }

  ngOnInit() {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.estabelecimentoService
      .pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total;
        this.estabelecimentos = resultado.estabelecimentos;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  confirmarExclusao(estabelecimento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(estabelecimento);
      },
    });
  }

  excluir(estabelecimento: any) {
    this.estabelecimentoService
      .excluir(estabelecimento.codigo)
      .then(() => {
        this.grid.first = 0;
        this.pesquisar();
        this.toastr.success('Estabelecimento excluído com sucesso!');
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  mudarStatus(codigo: number, status: boolean) {
    this.estabelecimentoService
      .mudarStatus(codigo, !status)
      .then(() => {
        this.grid.first = 0;
        this.pesquisar();
        if (!status) {
          this.toastr.success('Fornecedor ativado com sucesso!');
        } else {
          this.toastr.success('Fornecedor desativado com sucesso!');
        }
      })
      .catch((error) => this.errorHandler.handle(error));
  }
}
