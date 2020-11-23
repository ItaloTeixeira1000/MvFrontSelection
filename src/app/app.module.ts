import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import br from '@angular/common/locales/br';

import { ProfissionalModule } from './profissional/profissional.module';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SegurancaModule } from './seguranca/seguranca.module';
import { EstabelecimentoProfissionalModule } from './estabelecimento-profissional/estabelecimento-profissional.module';

registerLocaleData(br, 'pt-BR');

/* export function tokenGetter() {
  return localStorage.getItem('token');
}
export function jwtOptionsFactory(authService) {
  return {
    tokenGetter: () => {
      if (authService.isAccessTokenInvalido()) {
        authService.obterNovoAccessToken().then(() => {
          return localStorage.getItem('token');
        });
      } else {
        return localStorage.getItem('token');
      }
    },
    whitelistedDomains: ['localhost:8080'],
    blacklistedRoutes: ['http://localhost:8080/oauth/token'],
  };
}*/

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // JwtModule.forRoot({
      // jwtOptionsProvider: {
      //  provide: JWT_OPTIONS,
      //  useFactory: jwtOptionsFactory,
      //  deps: [TokenServiceService],
      // },
    //  config: {
    //    tokenGetter,
    //    whitelistedDomains: ['localhost:8080'],
    //    blacklistedRoutes: ['http://localhost:8080/oauth/token'],
    //  },
    // }),

    EstabelecimentoModule,
    ProfissionalModule,
    EstabelecimentoProfissionalModule,
    SegurancaModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
