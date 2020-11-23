import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent } from 'primeng/api/public_api';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

import { ProfissionalService } from '../profissional.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ProfissionalFiltro } from '../profissional.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-livros-pesquisa',
  templateUrl: './profissional-pesquisa.component.html',
  styleUrls: ['./profissional-pesquisa.component.css'],
})
export class ProfissionalPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new ProfissionalFiltro();
  lancamentos = [];
  @ViewChild('tabela', { static: false }) grid;

  constructor(
    private profissionalService: ProfissionalService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private toastr: ToastrService,
    private confirmation: ConfirmationService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de profissionais');
  }
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.profissionalService
      .pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.profissionais;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExlusao(profissional: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(profissional);
      },
    });
  }

  excluir(profissional: any) {
    this.profissionalService
      .excluir(profissional.codigo)
      .then(() => {
        this.grid.first = 0;
        this.pesquisar();
        this.toastr.success('Profissional excluído com sucesso!');
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
}
