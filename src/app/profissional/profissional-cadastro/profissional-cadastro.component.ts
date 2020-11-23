import { Profissional } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastrService } from 'ngx-toastr';

import { EstabelecimentoService } from 'src/app/estabelecimento/estabelecimento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ProfissionalService } from '../profissional.service';

@Component({
  selector: 'app-livro-cadastro',
  templateUrl: './profissional-cadastro.component.html',
  styleUrls: ['./profissional-cadastro.component.css'],
})
export class ProfissionalCadastroComponent implements OnInit {
  fornecedores = [];
  livro = new Profissional();

  constructor(
    private profissionalService: ProfissionalService,
    private toasty: ToastrService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    const codigoLivro = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Profissional');

    if (codigoLivro) {
      this.carregarLivro(codigoLivro);
    }

  }

  get editando() {
    return Boolean(this.livro.codigo);
  }

  carregarLivro(codigo: number) {
    this.profissionalService
      .buscarPorCodigo(codigo)
      .then((livro) => {
        this.livro = livro;
        this.atualizarTitiloEdicao();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarLivro(form);
    } else {
      this.adicionarLivro(form);
    }
  }

  adicionarLivro(form: NgForm) {
    this.profissionalService
      .adicionar(this.livro)
      .then((livroAdicionado) => {
        this.toasty.success('Profissional adicionado com sucesso');

        // form.reset();
        // this.livro = new Livro();
        this.router.navigate(['/profissional', livroAdicionado.codigo]);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  atualizarLivro(form: NgForm) {
    this.profissionalService
      .atualizar(this.livro)
      .then((livro) => {
        this.livro = livro;

        this.toasty.success('Profissional alterado com sucesso!');
        this.atualizarTitiloEdicao();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout(function() {
      this.livro = new Profissional();
    }.bind(this), 1);

    this.router.navigate(['/profissional/novo']);
  }

  atualizarTitiloEdicao() {
    this.title.setTitle(`Edição de profissional: ${this.livro.nome}`);
  }
}
