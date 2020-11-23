import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {TableModule} from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

import { EstabelecimentoPesquisaComponent } from './estabelecimento-pesquisa/estabelecimento-pesquisa.component';
import { EstabelecimentoCadastroComponent } from './estabelecimento-cadastro/estabelecimento-cadastro.component';
import { EstabelecimentoRoutingModule } from './estabelecimento-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EstabelecimentoPesquisaComponent,
    EstabelecimentoCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    MessageModule,
    SharedModule,
    EstabelecimentoRoutingModule
  ],
  exports: []
})
export class EstabelecimentoModule { }
