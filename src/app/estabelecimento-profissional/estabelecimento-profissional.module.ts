import { EstabelecimentoProfissionalRoutingModule } from './estabelecimento-profissional-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstabelecimentoProfissionalCadastroComponent } from './estabelecimento-profissional-cadastro/estabelecimento-profissional-cadastro.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { EstabelecimentoProfissionalPesquisarComponent } from './estabelecimento-profissional-pesquisar/estabelecimento-profissional-pesquisar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [EstabelecimentoProfissionalCadastroComponent, EstabelecimentoProfissionalPesquisarComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    EstabelecimentoProfissionalRoutingModule,
    SharedModule

  ],
  exports: []
})
export class EstabelecimentoProfissionalModule { }
