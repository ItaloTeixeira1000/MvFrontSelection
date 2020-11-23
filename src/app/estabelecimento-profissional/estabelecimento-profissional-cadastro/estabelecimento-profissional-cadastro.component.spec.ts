import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentoProfissionalCadastroComponent } from './estabelecimento-profissional-cadastro.component';

describe('EstabelecimentoProfissionalCadastroComponent', () => {
  let component: EstabelecimentoProfissionalCadastroComponent;
  let fixture: ComponentFixture<EstabelecimentoProfissionalCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstabelecimentoProfissionalCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstabelecimentoProfissionalCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
