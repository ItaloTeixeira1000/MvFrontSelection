import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfissionalPesquisaComponent } from './profissional-pesquisa/profissional-pesquisa.component';
import { ProfissionalCadastroComponent } from './profissional-cadastro/profissional-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'profissional',
    component: ProfissionalPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_VIEW'] }
  },
  {
    path: 'profissional/novo',
    component: ProfissionalCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CHANGE'] }
  },
  {
    path: 'profissional/:codigo',
    component: ProfissionalCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CHANGE'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfissionalRoutingModule {}
