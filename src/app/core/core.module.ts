import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfissionalService } from '../profissional/profissional.service';
import { EstabelecimentoService} from '../estabelecimento/estabelecimento.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { AuthService } from '../seguranca/auth.service';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';
import { EstabelecimentoProfissionalService } from '../estabelecimento-profissional/estabelecimento-profissional.service';

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    ToastrModule.forRoot(),
    ConfirmDialogModule
  ],
  exports: [
    NavbarComponent,
    ConfirmDialogModule
  ],
  providers: [
    ProfissionalService,
    EstabelecimentoService,
    ErrorHandlerService,
    AuthService,
    EstabelecimentoProfissionalService,

    ConfirmationService,
    JwtHelperService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR'},
  ]
})
export class CoreModule { }
