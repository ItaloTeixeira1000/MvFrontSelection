import { EstabelecimentoService } from './../../estabelecimento/estabelecimento.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ocupacao } from 'src/app/core/model';
import { EstabelecimentoProfissionalService } from '../estabelecimento-profissional.service';
import { ProfissionalService } from 'src/app/profissional/profissional.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-estabelecimento-profissional-cadastro',
  templateUrl: './estabelecimento-profissional-cadastro.component.html',
  styleUrls: ['./estabelecimento-profissional-cadastro.component.css']
})
export class EstabelecimentoProfissionalCadastroComponent implements OnInit {

  ocupacao = new Ocupacao();
  estabelecimentos = [];
  profissionais = [];

  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private profissionalService: ProfissionalService,
    private toasty: ToastrService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.carregarEstabelecimento();
    this.carregarProfissional();
  }

  salvar(form: NgForm) {
    this.estabelecimentoService.buscarPorCodigo(this.ocupacao.codigoEstabelecimento)
      .then((response) => {
        response.profissionais.push(
          {
            codigo: this.ocupacao.codigoProfissional,
            nome: '',
            telefoneCelular: '',
            telefoneResidencial: '',
            funcao: ''
          }
        );

        this.estabelecimentoService.atualizar(response)
          .then(() => {
            this.toasty.success('Ocupação adicionada com sucesso!');
            form.reset();
          })
          .catch((erro) => this.errorHandler.handle(erro));
      });
  }

  carregarEstabelecimento() {
    this.estabelecimentoService.listarTodosEstabelecimentos()
      .then((estabelecimentos) => {
        this.estabelecimentos = estabelecimentos.content.map((e) => ({
          label: e.nome,
          value: e.codigo
        }));
      });
  }

  carregarProfissional() {
    this.profissionalService.listarTodosProfissionais()
      .then((profissionais) => {
        this.profissionais = profissionais.content.map((p) => ({
          label: p.nome,
          value: p.codigo
        }));
      });
  }
}
