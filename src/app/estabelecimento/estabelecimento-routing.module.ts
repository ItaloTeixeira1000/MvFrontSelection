import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstabelecimentoPesquisaComponent } from './estabelecimento-pesquisa/estabelecimento-pesquisa.component';
import { EstabelecimentoCadastroComponent } from './estabelecimento-cadastro/estabelecimento-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'estabelecimento',
    component: EstabelecimentoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_VIEW'] }
  },
  {
    path: 'estabelecimento/novo',
    component: EstabelecimentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CHANGE'] }
  },
  {
    path: 'estabelecimento/:codigo',
    component: EstabelecimentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CHANGE'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstabelecimentoRoutingModule {}
