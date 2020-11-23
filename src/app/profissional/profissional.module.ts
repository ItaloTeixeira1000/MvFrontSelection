import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ProfissionalCadastroComponent } from './profissional-cadastro/profissional-cadastro.component';
import { ProfissionalPesquisaComponent } from './profissional-pesquisa/profissional-pesquisa.component';
import { SharedModule } from '../shared/shared.module';
import { ProfissionalRoutingModule } from './profissional-routing.module';

@NgModule({
  declarations: [
    ProfissionalCadastroComponent,
    ProfissionalPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    InputMaskModule,
    CurrencyMaskModule,

    SharedModule,
    ProfissionalRoutingModule
  ],
  exports: []
})
export class ProfissionalModule { }
