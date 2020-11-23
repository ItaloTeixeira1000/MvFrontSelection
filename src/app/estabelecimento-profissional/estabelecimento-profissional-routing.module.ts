import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { EstabelecimentoProfissionalCadastroComponent } from './estabelecimento-profissional-cadastro/estabelecimento-profissional-cadastro.component';
import { EstabelecimentoProfissionalPesquisarComponent } from './estabelecimento-profissional-pesquisar/estabelecimento-profissional-pesquisar.component';

const routes: Routes = [
  {
    path: 'estabelecimento-profissional',
    component: EstabelecimentoProfissionalPesquisarComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_VIEW'] }
  },
  {
    path: 'estabelecimento-profissional/novo',
    component: EstabelecimentoProfissionalCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CHANGE'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstabelecimentoProfissionalRoutingModule {}
